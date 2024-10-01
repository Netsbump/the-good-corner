import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/informatique')({
  component: () => <div>Hello /informatique!</div>,
})
