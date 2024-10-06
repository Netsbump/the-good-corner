import { Header } from '@/components/Header'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-3 gap-4 flex-wrap w-full">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
})
