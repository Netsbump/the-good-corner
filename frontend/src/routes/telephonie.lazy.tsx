import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/telephonie')({
  component: () => <div>Hello /telephonie!</div>,
})
