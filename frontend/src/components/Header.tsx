import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Account } from './Account'
import { Favorites } from './Favorites'
import { HistorySearch } from './HistorySearch'
import { Messages } from './Messages'
import { Navbar } from './Navbar'
import { PublishButton } from './PublishButton'
import { Searchbar } from './Searchbar'

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setIsSticky(true)
        }
        else {
          setIsSticky(false)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (stickyRef.current) {
      observer.observe(stickyRef.current)
    }

    return () => {
      if (stickyRef.current) {
        observer.unobserve(stickyRef.current)
      }
    }
  }, [])

  return (
    <>
      <div ref={stickyRef} className="h-1 absolute top-0" />
      <header
        ref={headerRef}
        className={`transition-all duration-300 bg-white ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-md z-50' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-3 gap-4">

          {/* Logo */}
          <h1>
            <Link to="/" className="flex items-center text-[#6F42C1] text-3xl font-bold">
              <span className="hidden sm:block">thegoodcorner</span>
            </Link>
          </h1>

          {/* Conteneur partagé entre PublishButton et Searchbar */}
          <div className="flex items-center gap-4 flex-shrink-0 max-w-lg w-full">
            {!isSearchExpanded && (
              <div className="flex-shrink-0">
                <PublishButton />
              </div>
            )}
            <div
              className={`flex-1 transition-all duration-300 ease-in-out ${
                isSearchExpanded ? 'w-full' : 'max-w-xs'
              }`}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => setIsSearchExpanded(false)}
            >
              <Searchbar />
            </div>
          </div>

          {/* Autres éléments du header */}
          <div className="flex items-center gap-6">
            <HistorySearch />
            <Favorites />
            <Messages />
            <Account />
          </div>

        </div>

        {/* Barre de navigation avec les catégories */}
        <Navbar />
      </header>
    </>
  )
}
