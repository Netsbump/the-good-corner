import { AdForm } from '@/components/AdForm'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ad/new')({
  component: NewAdPage,
})

function NewAdPage() {
  const navigate = Route.useNavigate()
  const { isAuthenticated, loading } = useAuth()

  const handleSubmit = () => {
    navigate({ to: '/', replace: true })
  }

  const handleCancel = () => {
    navigate({ to: '/' })
  }

  if (loading) return <div>Loading...</div>

  if (!isAuthenticated) return <div>
    Vous devez être connecté pour créer une annonce
    <Button onClick={() => navigate({ to: '/auth', search: { from: '/ad/new' } })}>
      Se connecter
    </Button>
  </div>

  return (<AdForm onSubmitSuccess={handleSubmit} onCancel={handleCancel} />)
}
