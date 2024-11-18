import { capitalizeFirstLetter } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Dot } from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { useQuery } from '@apollo/client'
import { GET_ALL_CATEGORIES } from '@/api/api'

export function Navbar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);

  if (loading) return <p>...</p>;
  if (error) return <p>erreur: {error.message}</p>

  const categories = data?.categories || [];

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName)
  }

  return (
    <nav aria-label="Menu des catégories" className="border-b border-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Tabs>
          <TabsList className="flex gap-4 overflow-x-auto whitespace-nowrap bg-white p-0">
            {categories.length > 0
            && categories.map((category, index) => (
              <div key={category.id} className="flex items-end h-full">
                <TabsTrigger value={category.name} className="p-0 bg-transparent border-none shadow-none">
                  <Link
                    to="/ads"
                    search={{ categoryId: category.id }}
                    className={`text-gray-700 hover:text-black font-medium transition-all duration-300 ease-in-out border-b-2 pb-2 ${
                      activeCategory === category.name ? 'border-b-black' : 'border-transparent hover:border-black'
                    }`}
                    aria-label={`Catégorie ${capitalizeFirstLetter(category.name)}`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {capitalizeFirstLetter(category.name)}
                  </Link>
                </TabsTrigger>
                {index !== categories.length - 1 && <Dot className="text-gray-500 self-center" />}
              </div>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </nav>
  )
}
