import { RecentAds } from '@/components/RecentAds'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <RecentAds />
  )
}
