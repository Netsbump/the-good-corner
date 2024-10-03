import type { AdType } from '@/lib/types'
import { fetchAdById } from '@/api/api'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/ads/$adId')({
  component: AdDetail,
})

function AdDetail() {
  const { adId } = Route.useParams()
  const isValidId = !Number.isNaN(Number(adId))
  const [ad, setAd] = useState<AdType | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const adResult = await fetchAdById(Number(adId))
      setAd(adResult)
    }
    fetch()
  }, [])

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

  if (!ad) {
    return <div>Chargement des données...</div>
  }

  return (
    <div>
      <h1>
        Annonce
        {ad.title}
      </h1>
      <p>{ad.description}</p>
      <p>{ad.location}</p>
      <p>{ad.owner}</p>
      <p>{ad.picture}</p>
      <p>{ad.price}</p>
      <p>{ad.category.name}</p>
      <p>
        {' '}
        {ad.tags?.map(tag => (
          <p key={tag.id}>{tag.name}</p>
        ))}
      </p>
    </div>
  )
}
