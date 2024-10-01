import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/vacances')({
  component: () => <div>Hello /vacances!</div>,
})
