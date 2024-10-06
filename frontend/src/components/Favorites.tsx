import { Link } from '@tanstack/react-router'
import { Heart } from 'lucide-react'

export function Favorites() {
  return (
    <div className="flex flex-col items-center text-xs text-gray-800">
      <Link to="/favorites" className="flex flex-col items-center gap-1 hover:text-[#6F42C1] transition-colors duration-300">
        <Heart size={24} />
        <span>Favoris</span>
      </Link>
    </div>
  )
}
