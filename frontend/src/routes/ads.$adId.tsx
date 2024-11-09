import type { AdDto } from '@tgc/packages'
import { deleteAd, fetchAdById } from '@/api/api'
import { AdForm } from '@/components/AdForm'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronRight, MapPin } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

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
          <div className="h-full flex flex-col w-full">

            <div className='flex w-full'>

              <div className='w-2/3'>
                <img src={ad.picture} />
              </div>
              <aside className="flex flex-col w-1/3 border border-slate-300 rounded-xl p-4 gap-2">
                <div className='flex pb-6'>

                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col justify-center items-start pl-6 w-full'>
                    <p>{ad.owner}</p>
                    <p> 1 annonces </p>
                  </div>
                  <div className='flex justify-end items-center'>
                    <ChevronRight />
                  </div>
                </div>

                <Separator />

                <div className='pt-6 flex flex-col justify-center gap-3'>
                  <Button className='bg-[#6F42C1] rounded-xl'>Acheter</Button>
                  <Button className='bg-lime-600 rounded-xl'>Message</Button>
                </div>
              </aside>

            </div>

            <div className='gap-5 flex flex-col'>
              <h1 className='font-bold'>
                {ad.title}
              </h1>

              <div className="flex flex-col">
                <p className='font-bold'>{ad.price} €</p>
              </div>

              <Separator />

              <div className="flex flex-col">
                <h2 className='font-bold'>Description</h2>
                <p>{ad.description}</p>
              </div>

              <Separator />

              <div className="flex">
                <MapPin />
                <p>{ad.location}</p>
              </div>

              <Separator />

              <div className='flex flex-col gap-3'>
                <div className='flex'>
                  {ad.tags && ad.tags.map(tag => (
                    <p key={tag.id}>{tag.name}</p>
                  ))}
                </div>
                <div>
                  <Badge className='rounded-full bg-yellow-300'>{ad.category.name}</Badge>
                </div>
              </div>

              <Separator />

              <div className="flex gap-5">
                <Button className='bg-red-600 rounded-xl' onClick={() => handleDelete(ad.id)}>Supprimer l'annonce</Button>
                <Button variant={'outline'} className='rounded-xl border-[#6F42C1] text-[#6F42C1]' onClick={() => handleUpdate(ad.id, ad)}>Modifier l'annonce</Button>
              </div>

            </div>
          </div>
        )}
    </>
  )
}
