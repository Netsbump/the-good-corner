import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/bebe')({
  component: () => <div>Hello /bebe!</div>,
})
