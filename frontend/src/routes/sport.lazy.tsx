import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/sport')({
  component: () => <div>Hello /sport!</div>,
})
