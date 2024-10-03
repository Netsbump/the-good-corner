import type { AdDto } from '@tgc/packages'
import config from '@/api/config'
import ky from 'ky'
import { useEffect, useState } from 'react'
import { AdCard } from './AdCard'

export function CategoryAds({ categoryId }: { categoryId: number }) {
  const [ads, setAds] = useState<AdDto[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fetchAdsByCategory = async () => {
      const listAds = await ky.get<AdDto[]>(`${config.apiUrl}/ads?category_ids=${categoryId}`).json()
      setAds(listAds)
    }

    fetchAdsByCategory()
  }, [categoryId])

  const handleClickButtonCard = (priceCard: number) => {
    setTotalPrice(prev => prev + priceCard)
  }

  return (
    <>
      <h2>
        Annonces pour la catégorie
        {/* {categoryName} */}
      </h2>
      <p>
        Prix total :
        {totalPrice}
      </p>
      <section className="recent-ads">
        {ads.map(ad => (
          <div key={ad.id}>
            <AdCard
              data={ad}
              onAddToCart={handleClickButtonCard}
            />
          </div>
        ))}
      </section>
    </>
  )
}
