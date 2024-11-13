import type { AdDto } from '@tgc/packages'
import ky from 'ky'
import { useEffect, useState } from 'react'
import config from '../api/config'
import { AdCard } from './AdCard'

export function RecentAds() {
  const [ads, setAds] = useState<AdDto[]>([])

  useEffect(() => {
    const fetchAds = async () => {
      const adsFromApi = await ky.get<AdDto[]>(`${config.apiUrl}/ads`).json()
      setAds(adsFromApi)
    }
    fetchAds()
  }, [])

  return (
    <section className="container mx-auto px-4">
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
}
