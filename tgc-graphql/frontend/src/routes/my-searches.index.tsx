import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-searches/')({
  component: () => <div>Hello /my-searches/!</div>,
})
