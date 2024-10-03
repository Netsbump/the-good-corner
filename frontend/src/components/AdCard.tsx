import type { AdDto } from '@tgc/packages'
import { Link } from '@tanstack/react-router'

interface AdCardProps {
  data: AdDto
  onAddToCart: (price: number) => void
}

export function AdCard({ data, onAddToCart }: AdCardProps) {
  const { title, picture, price, id, category, tags } = data
  const link = `/ads/${id}`

  return (
    <div className="flex flex-col">
      <div className="ad-card-container">
        <Link className="ad-card-link" to={link}>
          <img className="rounded-t-lg h-[300px]" src={picture} />
          <div className="ad-card-text">
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">
              {price}
              {' '}
              €
            </div>
          </div>
          <div>
            Catégorie:
            {category.name}
          </div>
          {tags && tags.map(tag => (
            <div key={tag.id}>
              Tags:
              {tag.name}
            </div>
          ))}
        </Link>

      </div>
      <button className="button" onClick={() => onAddToCart(price)}>
        Ajouter le prix au total
      </button>
    </div>
  )
}
