import { Navbar } from './Navbar'
import { PublishButton } from './PublishButton'
import { Searchbar } from './Searchbar'

export function Header() {
  return (
    <header className="header">
      <div className="main-menu">
        <h1>
          <a
            href="/"
            className="button logo link-button"
          >
            <span className="mobile-short-label">
              TGC
            </span
            >
            <span className="desktop-long-label">THE GOOD CORNER</span>
          </a
          >
        </h1>
        <Searchbar />
        <PublishButton />
      </div>
      <Navbar />
    </header>
  )
}
