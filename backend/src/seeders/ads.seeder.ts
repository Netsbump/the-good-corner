import { dataSource } from '../datasource'
import { Ad } from '../entities/ad.entity'
import { Category } from '../entities/category.entity'
import { getFakeAds } from '../utils/faker.ads'

export async function seedAds() {
  const adRepository = dataSource.getRepository(Ad)
  const categoryRepository = dataSource.getRepository(Category)

  // Vérifier s'il y a déjà des annonces dans la base de données
  const adCount = await adRepository.count()
  if (adCount > 0) {
    console.warn('Ads already exist, skipping faker data generation.')
    return
  }

  // Récupérer toutes les catégories
  const categories = await categoryRepository.find()
  const categoryMap = new Map<number, Category>()
  categories.forEach((category) => {
    categoryMap.set(category.id, category)
  })

  // Insérer les annonces factices
  const fakeAds = getFakeAds()
  const ads = fakeAds.map((adData) => {
    const ad = new Ad()
    ad.title = adData.title
    ad.description = adData.description
    ad.price = adData.price
    ad.owner = adData.owner
    ad.picture = adData.picture
    ad.location = adData.location

    // Trouver la catégorie correspondante et l'associer à l'annonce
    const category = categoryMap.get(adData.category_id)
    if (!category) {
      throw new Error(`Category with ID ${adData.category_id} not found`)
    }
    ad.category = category

    return ad
  })

  await adRepository.save(ads) // Enregistrer les annonces dans la base de données

  console.warn('Fake ads have been inserted.')
}
