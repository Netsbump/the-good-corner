import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/velos')({
  component: () => <div>Hello /velos!</div>,
})
