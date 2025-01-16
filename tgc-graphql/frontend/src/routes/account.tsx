import { SIGN_OUT } from '@/api/api'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useMutation } from '@apollo/client'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'

export const Route = createFileRoute('/account')({
  component: () => <AccountPage />,
})

function AccountPage() {

  const { isAuthenticated, refetch } = useAuth()
  const navigate = useNavigate()

  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted: async () => {
      await refetch()
      navigate({ to: '/' })
    }
  })

  async function handleLogout() {
    const result = await signOut()

    if (!result) {
      toast({
        title: 'Erreur lors de la déconnexion',
        variant: 'destructive',
      })
    }
  }

  if (!isAuthenticated) return <div>Vous devez être connecté pour accéder à cette page</div>

  return (
    <div>
      <h1>Page de profil</h1>
      <p>Truc à afficher</p>
      <Button onClick={handleLogout}>
        Me déconnecter
      </Button>
    </div>
  )
}
