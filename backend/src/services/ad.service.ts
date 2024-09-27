import type { Repository } from 'typeorm'
import type { Ad } from '../entities/ad.entity'
import type { Category } from '../entities/category.entity'
import type { AdType } from '../utils/types'
import { In } from 'typeorm'

export class AdService {
  constructor(private readonly adsRepository: Repository<Ad>, private readonly categoryRepository: Repository<Category>) {}

  public async getAll(categoryIds?: string) {
    try {
      if (categoryIds) {
        const categoryIdArray = categoryIds.split(',').map(id => Number.parseInt(id.trim(), 10))

        if (categoryIdArray.some(Number.isNaN)) {
          throw new Error('Invalid category ID format')
        }

        return await this.adsRepository.find({
          where: { category: { id: In(categoryIdArray) } }, // La clé doit être la propriété "id" de Category
          relations: ['category', 'tags'],
          order: { category: { id: 'ASC' } }, // Tri par ID de la catégorie
        })
      }
      else {
      // Récupérer toutes les annonces si aucun category_id n'est spécifié
        return await this.adsRepository.find({
          relations: ['category', 'tags'],
        })
      }
    }
    catch (error) {
      throw new Error(`Failed to retrieve ads: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  public async getById(id: number): Promise<Ad | null> {
    const ad = await this.adsRepository.findOne({
      where: { id },
      relations: ['category'],
    })
    return ad || null
  }

  public async create(ad: AdType): Promise<Ad> {
    try {
      const newAd = this.adsRepository.create()
      newAd.title = ad.title
      newAd.description = ad.description
      newAd.price = ad.price
      newAd.owner = ad.owner
      newAd.picture = ad.picture
      newAd.location = ad.location
      newAd.category = await this.categoryRepository.findOneByOrFail({ id: ad.category })

      await this.adsRepository.save(newAd)

      return newAd
    }
    catch (error) {
      throw new Error(`Failed to create ad : ${error instanceof Error ? error.message : error}`)
    }
  }

  public async update(id: number, ad: AdType): Promise<Ad | null> {
    try {
      const updateAd = await this.adsRepository.findOneBy({ id })

      if (!updateAd) {
        return null
      }

      updateAd.title = ad.title
      updateAd.description = ad.description
      updateAd.price = ad.price
      updateAd.owner = ad.owner
      updateAd.picture = ad.picture
      updateAd.location = ad.location
      updateAd.category = await this.categoryRepository.findOneByOrFail({ id: ad.category })

      await this.adsRepository.save(updateAd)

      return updateAd
    }
    catch (error) {
      throw new Error(`Failed to update ad : ${error instanceof Error ? error.message : error}`)
    }
  }

  public async partialUpdate(id: number, ad: Partial<AdType>): Promise<Ad | null> {
    try {
      const adToUpdate = await this.adsRepository.findOneBy({ id })

      if (!adToUpdate) {
        return null
      }

      if (ad.category) {
        adToUpdate.category = await this.categoryRepository.findOneByOrFail({ id: ad.category })
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
