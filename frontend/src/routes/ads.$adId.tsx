import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ads/$adId')({
  component: AdPage,
})

function AdPage() {
  const { adId } = Route.useParams()
  const isValidId = !Number.isNaN(Number(adId))
  if (!isValidId) {
    return (
      <div>
        <h1>Invalid ad ID</h1>
        <p>
          The ad ID "
          {adId}
          " is not valid.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>
        Annonce
        {adId}
      </h1>
    </div>
  )
}
