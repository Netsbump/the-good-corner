import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/vehicules')({
  component: () => <div>Hello /vehicules!</div>,
})
