import { AdForm } from '@/components/AdForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ad/new')({
  component: NewAdPage,
})

function NewAdPage() {
  const navigate = Route.useNavigate()

  const handleSubmit = () => {
    navigate({ to: '/', replace: true })
  }

  const handleCancel = () => {
    navigate({ to: '/' })
  }

  return (<AdForm onSubmitSuccess={handleSubmit} onCancel={handleCancel} />)
}
