import type { AdDto } from '@tgc/packages'
import config from '@/api/config'
import { AdCard } from '@/components/AdCard'
import { createFileRoute } from '@tanstack/react-router'
import ky from 'ky'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/ads/')({
  validateSearch: search => ({
    categoryId: search.categoryId ? Number(search.categoryId) : undefined, // Valide le search param
  }),
  component: AdsPage,
})

function AdsPage() {
  const { categoryId } = Route.useSearch() // Récupère les query params optionnels
  const [isValidCategory, setIsValidCategory] = useState(false)
  const [loading, setLoading] = useState(true)
  const [ads, setAds] = useState<AdDto[]>([])

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true)
      try {
        if (categoryId) {
          // Appel avec filtrage par catégorie
          const listAds = await ky.get<AdDto[]>(`${config.apiUrl}/ads?category_ids=${categoryId}`).json()
          setAds(listAds)
          setIsValidCategory(true)
        }
        else {
          // Appel sans catégorie
          const adsFromApi = await ky.get<AdDto[]>(`${config.apiUrl}/ads`).json()
          setAds(adsFromApi)
        }
      }
      catch (error) {
        if (categoryId) {
          // Erreur spécifique à la catégorie
          setIsValidCategory(false)
        }
        else {
          // Erreur générale (réseau, serveur, etc.)
          console.error('Erreur lors de la récupération des annonces', error)
        }
      }
      finally {
        setLoading(false)
      }
    }

    fetchAds()
  }, [categoryId])

  if (loading) {
    return <div>Chargement des annonces...</div>
  }

  if (categoryId && !isValidCategory) {
    return (
      <div>
        <h1>Erreur : Catégorie invalide</h1>
        <p>
          La catégorie "
          {categoryId}
          " n'existe pas.
        </p>
      </div>
    )
  }

  return (
    <section className="recent-ads">
      {!categoryId && (<h1>Toutes les annonces</h1>)}

      {ads && ads.map(ad => (
        <div key={ad.id}>
          <AdCard
            data={ad}
          />
        </div>
      ))}

      <div>Aucune annonces trouvés</div>
    </section>
  )
}
