import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/photographie')({
  component: () => <div>Hello /photographie!</div>,
})
