import { AdForm } from '@/components/AdForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ad/new')({
  component: AdForm,
})
