import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/ameublement')({
  component: () => <div>Hello /ameublement!</div>,
})
