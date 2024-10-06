import { Link } from '@tanstack/react-router'
import { MessageSquareText } from 'lucide-react'

export function Messages() {
  return (
    <div className="flex flex-col items-center text-xs text-gray-800">
      <Link to="/messages" className="flex flex-col items-center gap-1 hover:text-[#6F42C1] transition-colors duration-300">
        <MessageSquareText size={24} />
        <span>Messages</span>
      </Link>
    </div>
  )
}
