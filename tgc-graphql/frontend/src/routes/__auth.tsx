import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/__auth')({
  component: AuthLayout
})

function AuthLayout() {
  return <div>
   hello from auth layout
  </div>
} 