import { dataSource } from '../datasource'
import { Ad } from '../entities/ad.entity'
import { Category } from '../entities/category.entity'
import { Tag } from '../entities/tag.entity'
import { User } from '../entities/user.entity'
import { getFakeAds } from '../utils/faker.ads'
import { seedUsers } from './users.seeder'

export async function seedAds() {
  const adRepository = dataSource.getRepository(Ad)
  const categoryRepository = dataSource.getRepository(Category)
  const tagRepository = dataSource.getRepository(Tag)

  // Vérifier s'il y a déjà des annonces
  const adCount = await adRepository.count()
  if (adCount > 0) {
    console.warn('Ads already exist, skipping faker data generation.')
    return
  }

  // S'assurer d'avoir un utilisateur par défaut
  const defaultUser = await seedUsers()

  // Récupérer les catégories et tags
  const categories = await categoryRepository.find()
  const categoryMap = new Map<number, Category>()
  categories.forEach((category) => {
    categoryMap.set(category.id, category)
  })

  const tags = await tagRepository.find()
  const tagMap = new Map<number, Tag>()
  tags.forEach((tag) => {
    tagMap.set(tag.id, tag)
  })

  // Insérer les annonces factices
  const fakeAds = getFakeAds()
  const ads = fakeAds.map((adData) => {
    const ad = new Ad()
    ad.title = adData.title
    if (adData.description) {
      ad.description = adData.description
    }
    ad.price = adData.price
    ad.picture = adData.picture
    ad.location = adData.location
    if (defaultUser) {
      ad.author = defaultUser
    } else {
      throw new Error('Default user not found')
    }

    // Associer la catégorie
    const category = categoryMap.get(Number(adData.category.id))
    if (!category) {
      throw new Error(`Category with ID ${adData.category.id} not found`)
    }
    ad.category = category

    // Associer les tags
    const adTags = adData.tags?.map((tagData) => {
      const tag = tagMap.get(Number(tagData.id))
      if (!tag) {
        throw new Error(`Tag with ID ${tagData.id} not found`)
      }
      return tag
    }) || []

    ad.tags = adTags

    return ad
  })

  await adRepository.save(ads)
  console.warn('Fake ads have been inserted.')
}
