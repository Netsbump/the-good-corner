import { createFileRoute, useNavigate, Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLazyQuery } from '@apollo/client'
import { GET_USER_BY_EMAIL } from '@/api/api'

const formSchema = z.object({
  email: z.string().email('Email invalide'),
})

export const Route = createFileRoute('/auth')({
  component: AuthenticationPage,
})

function AuthenticationPage() {
  const navigate = useNavigate()
  const [checkEmail, { loading }] = useLazyQuery(GET_USER_BY_EMAIL)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await checkEmail({
        variables: { email: values.email },
      })

      if (data?.userByEmail) {
        navigate({
          to: '/sign-in',
          search: { email: values.email },
        })
      } else {
        navigate({
          to: '/register-in',
          search: { email: values.email },
        })
      }
    } catch (error) {
      console.error('Error:', error)
      form.setError('email', {
        type: 'manual',
        message: "Une erreur est survenue lors de la vérification de l'email",
      })
    }
  }

  return (
    <>
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Bienvenue sur TheGoodCorner</CardTitle>
          <CardDescription>
            Connectez-vous ou créez votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Vérification...' : 'Continuer'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    
    <Outlet />
    </>
  )
}
