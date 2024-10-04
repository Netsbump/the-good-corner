import type { AdDto } from '@tgc/packages'
import { deleteAd, fetchAdById } from '@/api/api'
import { AdForm } from '@/components/AdForm'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/ads/$adId')({
  component: AdDetail,
})

function AdDetail() {
  const navigate = Route.useNavigate()
  const { adId } = Route.useParams()
  const isValidId = !Number.isNaN(Number(adId))
  const [ad, setAd] = useState<AdDto | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [refreshData, setRefreshData] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (isValidId) {
        const adResult = await fetchAdById(Number(adId))
        setAd(adResult)
      }
    }
    fetch()
  }, [adId, isValidId, refreshData])

  const handleDelete = async (id: number) => {
    try {
      await deleteAd(id)
      navigate({ to: '/', replace: true })
    }
    catch (error) {
      console.error('Deleted Error:', error)
    }
  }

  const handleUpdate = async (id: number, ad: AdDto) => {
    // todo route modifyAd ou updateAd qui appelle le composant FormAd
    console.warn(id)
    console.warn(ad)
    setIsEditing(true)
  }

  const handleUpdateSuccess = () => {
    setIsEditing(false) // Désactiver le mode édition
    setRefreshData((prev => !prev))
  }

  const handleCancelUpdate = () => {
    setIsEditing(false) // Désactiver le mode édition
  }

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
    <>
      {isEditing
        ? (
            <AdForm ad={ad} onSubmitSuccess={handleUpdateSuccess} onCancel={handleCancelUpdate} />
          )
        : (
            <div className="border-solid border-[1px] h-full border-black flex flex-col">
              <img src={ad.picture} />

              <h1>
                {ad.title}
              </h1>
              <div className="flex flex-col">
                <h2>Description</h2>
                <p>{ad.description}</p>
              </div>

              <div className="flex flex-col">
                <h2>Ville</h2>
                <p>{ad.location}</p>
              </div>

              <div className="flex flex-col">
                <h2>Vendeur</h2>
                <p>{ad.owner}</p>
              </div>

              <div className="flex flex-col">
                <h2>Prix</h2>
                <p>{ad.price}</p>
              </div>

              <p className="border-solid border-[1px] border-yellow-200">{ad.category.name}</p>
              {ad.tags && ad.tags.map(tag => (
                <p key={tag.id}>{tag.name}</p>
              ))}

              <div className="flex">
                <button onClick={() => handleDelete(ad.id)}>Supprimer l'annonce</button>
                <button onClick={() => handleUpdate(ad.id, ad)}>Modifier l'annonce</button>
              </div>

            </div>
          )}
    </>
  )
}
