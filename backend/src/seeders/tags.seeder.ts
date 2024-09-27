import { dataSource } from '../datasource'
import { Tag } from '../entities/tag.entity'

export async function seedTags() {
  const tagRepository = dataSource.getRepository(Tag)

  // Vérifier s'il y a déjà des catégories dans la base de données
  const tagCount = await tagRepository.count()
  if (tagCount > 0) {
    console.warn('Tags already exist, skipping insertion.')
    return
  }

  // Les catégories à insérer
  const tags = [
    { name: 'Musculaire' },
    { name: 'Hiver' },
    { name: 'Sport' },
  ]

  // Insérer les catégories dans la base de données
  const tagEntities = tagRepository.create(tags)
  await tagRepository.save(tagEntities)

  console.warn('Tags have been inserted.')
}
