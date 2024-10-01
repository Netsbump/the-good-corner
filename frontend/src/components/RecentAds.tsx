import type { AdCardType } from '@/lib/ad.type'
import ky from 'ky'
import { useEffect, useState } from 'react'
import config from '../config'
import { AdCard } from './AdCard'

export function RecentAds() {
  const [totalPrice, setTotalPrice] = useState(0)
  const [ads, setAds] = useState<AdCardType[]>([])

  useEffect(() => {
    const fetchAds = async () => {
      const adsFromApi = await ky.get<AdCardType[]>(`${config.apiUrl}/ads`).json()
      setAds(adsFromApi)
    }
    fetchAds()
  }, [])

  const handleClickButtonCard = (priceCard: number) => {
    setTotalPrice(prev => prev + priceCard)
  }

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>
        Prix total:
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
