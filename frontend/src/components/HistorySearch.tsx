import { Link } from '@tanstack/react-router'
import { Bell } from 'lucide-react'

export function HistorySearch() {
  return (
    <div className="flex flex-col items-center text-xs text-gray-800">
      <Link to="/my-searches" className="flex flex-col items-center gap-1 hover:text-[#6F42C1] transition-colors duration-300">
        <Bell size={24} />
        <span>Mes Recherches</span>
      </Link>
    </div>
  )
}
