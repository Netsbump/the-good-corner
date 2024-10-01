import { Link } from '@tanstack/react-router'
import { Navbar } from './Navbar'
import { PublishButton } from './PublishButton'
import { Searchbar } from './Searchbar'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-300 p-2.5 bg-white">
      <div className="flex justify-between items-center gap-2.5 text-[#ffa41b]">
        <h1>
          <Link to="/" className="button logo link-button">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label">THE GOOD CORNER</span>
          </Link>
        </h1>
        <Searchbar />
        <PublishButton />
      </div>
      <Navbar />
    </header>
  )
}
