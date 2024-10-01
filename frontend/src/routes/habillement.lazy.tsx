import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/habillement')({
  component: () => <div>Hello /habillement!</div>,
})
