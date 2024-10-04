import type { AdDtoToCreate } from '@tgc/packages'
import type { Repository } from 'typeorm'
import type { Ad } from '../entities/ad.entity'
import type { Category } from '../entities/category.entity'
import type { Tag } from '../entities/tag.entity'
import type { AdType } from '../utils/types'
import { In } from 'typeorm'

export class AdService {
  constructor(private readonly adsRepository: Repository<Ad>, private readonly categoryRepository: Repository<Category>, private readonly tagRepository: Repository<Tag>) {}

  public async getAll() {
    return await this.adsRepository.find({
      relations: ['category', 'tags'],
    })
  }

  async getAllByCategory(categoryIds: string) {
    const categoryIdArray = categoryIds.split(',').map(id => Number.parseInt(id.trim(), 10))

    if (categoryIdArray.some(Number.isNaN)) {
      throw new Error('Invalid category ID format')
    }

    return await this.adsRepository.find({
      where: { category: { id: In(categoryIdArray) } },
      relations: ['category', 'tags'],
      order: { category: { id: 'ASC' } },
    })
  }

  public async getById(id: number): Promise<Ad | null> {
    const ad = await this.adsRepository.findOne({
      where: { id },
      relations: ['category', 'tags'],
    })
    return ad || null
  }

  public async create(ad: AdDtoToCreate): Promise<Ad> {
    try {
      const newAd = this.adsRepository.create()
      newAd.title = ad.title
      if (ad.description) {
        newAd.description = ad.description
      }
      newAd.price = ad.price
      newAd.owner = ad.owner
      newAd.picture = ad.picture
      newAd.location = ad.location
      newAd.category = await this.categoryRepository.findOneByOrFail({ id: ad.category.id })

      // Vérification et ajout des tags
      if (ad.tags && ad.tags.length > 0) {
        const tagIds = ad.tags.map(tag => tag.id)
        const existingTags = await this.tagRepository.find({
          where: { id: In(tagIds) }, // Utilisation de find avec where et In pour filtrer par ID
        })

        if (existingTags.length !== ad.tags.length) {
          throw new Error('Some tags could not be found.')
        }

        newAd.tags = existingTags
      }

      await this.adsRepository.save(newAd)

      return newAd
    }
    catch (error) {
      throw new Error(`Failed to create ad : ${error instanceof Error ? error.message : error}`)
    }
  }

  public async update(id: number, ad: AdDtoToCreate): Promise<Ad | null> {
    try {
      const updateAd = await this.adsRepository.findOneBy({ id })

      if (!updateAd) {
        return null
      }

      updateAd.title = ad.title
      if (ad.description) {
        updateAd.description = ad.description
      }
      updateAd.price = ad.price
      updateAd.owner = ad.owner
      updateAd.picture = ad.picture
      updateAd.location = ad.location
      updateAd.category = await this.categoryRepository.findOneByOrFail({ id: ad.category.id })

      await this.adsRepository.save(updateAd)

      return updateAd
    }
    catch (error) {
      throw new Error(`Failed to update ad : ${error instanceof Error ? error.message : error}`)
    }
  }

  public async partialUpdate(id: number, ad: Partial<AdDtoToCreate>): Promise<Ad | null> {
    try {
      const adToUpdate = await this.adsRepository.findOneBy({ id })

      if (!adToUpdate) {
        return null
      }

      if (ad.category) {
        adToUpdate.category = await this.categoryRepository.findOneByOrFail({ id: ad.category.id })
      }

      Object.assign(adToUpdate, ad)

      await this.adsRepository.save(adToUpdate)

      return adToUpdate
    }
    catch (error) {
      throw new Error(`Failed to update ad: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  public async deleteById(id: number): Promise<boolean> {
    try {
      const result = await this.adsRepository.delete(id)
      return result.affected !== 0 // Retourne true si une annonce a été supprimée
    }
    catch (error) {
      throw new Error(`Failed to delete ad: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  public async deleteAll(): Promise<void> {
    try {
      await this.adsRepository.clear()
    }
    catch (error) {
      throw new Error(`Failed to delete all ads: ${error instanceof Error ? error.message : error}`)
    }
  }
}
