import { dataSource } from '../datasource'
import { Category } from '../entities/category.entity'

export async function seedCategories() {
  const categoryRepository = dataSource.getRepository(Category)

  // Vérifier s'il y a déjà des catégories dans la base de données
  const categoryCount = await categoryRepository.count()
  if (categoryCount > 0) {
    console.warn('Categories already exist, skipping insertion.')
    return
  }

  // Les catégories à insérer
  const categories = [
    { name: 'immobilier' },
    { name: 'véhicules' },
    { name: 'locations de vacances' },
    { name: 'emploi' },
    { name: 'mode' },
    { name: 'électronique' },
    { name: 'loisirs' },
    { name: 'autres' },
  ]

  // Insérer les catégories dans la base de données
  const categoryEntities = categoryRepository.create(categories)
  await categoryRepository.save(categoryEntities)

  console.warn('Categories have been inserted.')
}
