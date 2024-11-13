import type { AdDto } from '@tgc/packages'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'

interface AdCardProps {
  data: AdDto
}

export function AdCard({ data }: AdCardProps) {
  const { title, picture, price, id, category, tags } = data
  const link = `/ads/${id}`

  return (
    <Card className="w-60 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={link} className="block relative">
        <img src={picture} alt={title} className="rounded-t-xl w-full h-48 object-cover" />
      </Link>
      <CardHeader className="px-4 py-2">
        <CardTitle className="text-base font-medium text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="text-black text-lg font-bold">
          {price}
          {' '}
          €
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {category.name}
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap mt-2">
            {tags.map(tag => (
              <span key={tag.id} className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs font-medium mr-2">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 py-2">
        <Link to={link} className="text-sm text-blue-500 hover:underline">Voir l'annonce</Link>
      </CardFooter>
    </Card>
  )
}
