import config from '@/api/config'
import { CategoryAds } from '@/components/CategoryAds'
import { RecentAds } from '@/components/RecentAds'
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
  // const navigate = useNavigate() // Pour modifier les query params sans recharger la page
  const [isValidCategory, setIsValidCategory] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const validateCategory = async () => {
      setLoading(true)
      if (categoryId) {
        try {
          // Appel API pour valider si la catégorie existe
          const category = await ky
            .get(`${config.apiUrl}/categories/${categoryId}`)
            .json()
          if (!category) {
            setIsValidCategory(false) // Si la catégorie n'existe pas
          }
          else {
            setIsValidCategory(true)
          }
        }
        catch {
          setIsValidCategory(false)
        }
      }
      setLoading(false)
    }

    validateCategory()
  }, [categoryId])

  //   const handleCategoryChange = (newCategoryId) => {
  //     navigate({
  //       search: { categoryId: newCategoryId }, // Mise à jour du paramètre de recherche
  //     })
  //   }

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

  if (!categoryId) {
    return (
      <div>
        <h1>Annonces récentes</h1>
        <RecentAds />
      </div>
    )
  }

  return (
    <div>
      <h1>
        Catégorie :
        {categoryId}
      </h1>
      <CategoryAds categoryId={categoryId} />
    </div>
  )
}
