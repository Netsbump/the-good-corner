import { Link } from '@tanstack/react-router'
import { CircleUser } from 'lucide-react'

export function Account() {
  return (
    <div className="flex flex-col items-center text-xs text-gray-800">
      <Link to="/account" className="flex flex-col items-center gap-1 hover:text-[#6F42C1] transition-colors duration-300">
        <CircleUser size={24} />
        <span>Prénom</span>
      </Link>
    </div>
  )
}
