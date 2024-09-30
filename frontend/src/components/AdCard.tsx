export interface AdCardProps {
  title: string
  imgUrl: string
  price: number
  link: string
}

export function AdCard({ title, imgUrl, price, link }: AdCardProps) {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={link}>
        <img className="ad-card-image" src={imgUrl} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">
            {price}
            {' '}
            €
          </div>
        </div>
      </a>
    </div>
  )
}
