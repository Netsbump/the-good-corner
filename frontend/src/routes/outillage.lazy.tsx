import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/outillage')({
  component: () => <div>Hello /outillage!</div>,
})
