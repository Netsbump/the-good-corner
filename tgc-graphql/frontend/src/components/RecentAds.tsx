
import { AdCard } from './AdCard'
import { useQuery } from '@apollo/client'
import { GET_ADS } from '@/api/api';
import { AdsQuery } from '@/gql/graphql';


export function RecentAds() {
  const { data, loading, error } = useQuery<AdsQuery>(GET_ADS);

  if (loading) return <p>Chargement des annonces...</p>;
  if (error) return <p>Erreur: {error.message}</p>

  const ads = data?.ads || [];

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
