import { useAuth } from '@/contexts/AuthContext'
import { CircleUser } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function Profile() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="flex flex-col items-center text-xs text-gray-800">
      {isAuthenticated ? (
        <div className="flex flex-col items-center gap-1">
          <Link to="/account">
            <CircleUser size={24} className="text-[#6F42C1]" />
            <span>{user?.email}</span>
          </Link>
        </div>
      ) : (
        <Link to="/auth" className="flex flex-col items-center gap-1 hover:text-[#6F42C1] transition-colors duration-300">
          <CircleUser size={24} />
          Se connecter
        </Link>
      )}
    </div>
  )
} 