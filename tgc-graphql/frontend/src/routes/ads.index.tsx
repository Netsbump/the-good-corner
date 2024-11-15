import type { AdDto } from '@tgc/packages'
import { AdCard } from '@/components/AdCard'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@apollo/client'
import { GET_ADS } from '@/api/api'

type GetAllAdsResponse = {
  ads: AdDto[];
}

export const Route = createFileRoute('/ads/')({
  validateSearch: search => ({
    categoryId: search.categoryId ? Number(search.categoryId) : undefined, // Valide le search param
  }),
  component: AdsPage,
})

function AdsPage() {
  const { categoryId } = Route.useSearch() // Récupère les query params optionnels
  console.log(typeof categoryId)
   // Appel GraphQL avec la variable categoryIds si categoryId est défini
   const { data, loading, error } = useQuery<GetAllAdsResponse>(GET_ADS, {
    variables: { categoryIds: categoryId ? [categoryId] : undefined },
  });


  if (loading) return <div>Chargement des annonces...</div>

  if (error) {
    return (
      <div>
        <h1>Erreur</h1>
        <p>Impossible de récupérer les annonces.</p>
      </div>
    );
  }

  const ads = data?.ads || [];

  return (
    <>
      {ads.length !== 0
        ? (
            <section className="container mx-auto px-4">
              {!categoryId && (<h1>Toutes les annonces</h1>)}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {ads.map(ad => (
                  <div key={ad.id} className="w-full max-w-sm">
                    <AdCard
                      data={ad}
                    />
                  </div>
                ))}
              </div>
            </section>
          )
        : <div>Il n'y a pas encore d'annonces, voulez vous en créer une ?</div>}
    </>
  )
}
