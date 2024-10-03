import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function PublishButton() {
  return (
    <Button asChild>
      <Link to="/ad/new">
        <span className="mobile-short-label">Publier</span>
        <span className="desktop-long-label">Publier une annonce</span>
      </Link>
    </Button>
  )
}
