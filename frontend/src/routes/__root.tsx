import { Header } from '@/components/Header'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="max-w-[832px] px-4 mx-auto my-[48px] mt-[120px]">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
})
