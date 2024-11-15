import type { AdDto } from '@tgc/packages'
import { DELETE_AD, GET_AD, GET_ADS } from '@/api/api'
import { AdForm } from '@/components/AdForm'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronRight, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useMutation, useQuery } from '@apollo/client'

type GetAdResponse = {
  ad: AdDto
}

export const Route = createFileRoute('/ads/$adId')({
  component: AdDetail,
})

function AdDetail() {
  const navigate = Route.useNavigate()
  const { adId } = Route.useParams()
  const [isEditing, setIsEditing] = useState(false)

  const { data, loading, error, refetch } = useQuery<GetAdResponse>(GET_AD,
    { variables: { adId: adId ? adId : null } }
  );

  const [deleteAdMutation, { loading: deleting }] = useMutation(DELETE_AD, {
    refetchQueries: [{ query: GET_ADS }], // Recharge la query GET_ADS
    onCompleted: () => {
      navigate({ to: '/', replace: true });
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression :', error);
    },
  });
  
  const handleDelete = async (id: number) => {
    try {
      await deleteAdMutation({ variables: { id } });
    }
    catch (error) {
      console.error('Erreur dans handleDelete :', error);
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
    refetch();
  }

  const handleCancelUpdate = () => {
    setIsEditing(false) // Désactiver le mode édition
  }

  if (loading) return <div>Chargement de l'annonce...</div>

  if (error) {
    return (
      <div>
        <h1>Erreur</h1>
        <p>Impossible de récupérer l'annonce.</p>
      </div>
    );
  }

  const ad = data?.ad || null;

  if (!ad) {
    return (
      <div>
        <h1>Annonce introuvable</h1>
        <p>L'annonce demandée n'existe pas ou a été supprimée.</p>
      </div>
    );
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
              <Button
                className="bg-red-600 rounded-xl"
                onClick={() => handleDelete(ad.id)}
                disabled={deleting} // Désactive le bouton pendant la suppression
              >
                {deleting ? 'Suppression...' : 'Supprimer l\'annonce'}
              </Button>
                <Button variant={'outline'} className='rounded-xl border-[#6F42C1] text-[#6F42C1]' onClick={() => handleUpdate(ad.id, ad)}>Modifier l'annonce</Button>
              </div>

            </div>
          </div>
        )}
    </>
  )
}
