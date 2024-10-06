import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'

export function PublishButton() {
  return (
    <Button asChild className="bg-[#6F42C1] text-white font-bold py-2 px-6 rounded-full hover:bg-[#8C5EDC] transition-colors duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C5EDC] ">
      <Link
        to="/ad/new"
        aria-label="Déposer une annonce"
        className="inline-block text-center"
      >
        <Plus size={16} className="hidden sm:block" aria-hidden="true" />
        <span className="hidden sm:block">Déposer une annonce</span>
        <span className="sm:hidden flex items-center gap-2">
          <Plus size={16} aria-hidden="true" />
          Publier
        </span>
      </Link>
    </Button>
  )
}
