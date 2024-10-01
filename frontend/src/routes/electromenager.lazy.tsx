import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/electromenager')({
  component: () => <div>Hello /electromenager!</div>,
})
