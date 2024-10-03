import type { CategoryType } from '@/lib/types'
import config from '@/api/config'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import ky from 'ky'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await ky.get<CategoryType[]>(`${config.apiUrl}/categories`).json()
      setCategories(result)
    }
    fetchCategories()
  }, [])

  return (
    <nav className="categories-navigation">
      {categories.map(category => (

        <Link key={category.id} to="/ads" search={{ categoryId: category.id }} className="category-navigation-link">{capitalizeFirstLetter(category.name)}</Link>

      ),
      )}
    </nav>
  )
}
