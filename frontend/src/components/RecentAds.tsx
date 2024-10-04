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
    <section className="recent-ads">
      {ads.map(ad => (
        <div key={ad.id}>
          <AdCard
            data={ad}
          />
        </div>
      ))}
    </section>
  )
}
