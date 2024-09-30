import { Button } from '@/components/ui/button'

export function PublishButton() {
  return (
    <Button asChild>
      <a href="/post-ad">
        <span className="mobile-short-label">Publier</span>
        <span className="desktop-long-label">Publier une annonce</span>
      </a>
    </Button>
  )
}
