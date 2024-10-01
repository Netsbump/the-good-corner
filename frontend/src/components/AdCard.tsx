import type { AdCardType } from '@/lib/ad.type'
import { Link } from '@tanstack/react-router'

interface AdCardProps {
  data: AdCardType
  onAddToCart: (price: number) => void
}

export function AdCard({ data, onAddToCart }: AdCardProps) {
  const { title, picture, price, id } = data
  const link = `/ads/${id}`

  return (
    <div className="flex flex-col">
      <div className="ad-card-container">
        <Link className="ad-card-link" to={link}>
          <img className="ad-card-image" src={picture} />
          <div className="ad-card-text">
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">
              {price}
              {' '}
              €
            </div>
          </div>
        </Link>

      </div>
      <button className="button" onClick={() => onAddToCart(price)}>
        Ajouter le prix au total
      </button>
    </div>
  )
}
