import type { SafeParseReturnType } from 'zod'
import type { AdType } from '../utils/types'
import { In } from 'typeorm'
import { Ad } from '../entities/ad.entity'
import { Category } from '../entities/category.entity'

export class AdService {
  static async getAll(categoryIds?: string) {
    try {
      if (categoryIds) {
        const categoryIdArray = categoryIds.split(',').map(id => Number.parseInt(id.trim(), 10))
        console.warn(categoryIdArray)
        if (categoryIdArray.some(Number.isNaN)) {
          throw new Error('Invalid category ID format')
        }

        // Utilisation de TypeORM pour filtrer sur les catégories spécifiées
        return await Ad.find({
          where: { category: { id: In(categoryIdArray) } }, // La clé doit être la propriété "id" de Category
          relations: ['category'], // Ajoutez cette ligne si vous voulez inclure les données de la catégorie dans la réponse
          order: { category: { id: 'ASC' } }, // Tri par ID de la catégorie
        })
      }
      else {
      // Récupérer toutes les annonces si aucun category_id n'est spécifié
        return await Ad.find({
          relations: ['category'], // Ajoutez cette ligne si vous voulez inclure les données de la catégorie dans la réponse
          order: { category: { id: 'ASC' } },
        })
      }
    }
    catch (error) {
      throw new Error(`Failed to retrieve ads: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  static async getById(id: number): Promise<Ad | null> {
    console.warn(id)
    const ad = await Ad.findOneBy({ id })
    return ad || null
  }

  static async create(ad: AdType): Promise<Ad> {
    try {
      const newAd = new Ad()
      newAd.title = ad.title
      newAd.description = ad.description
      newAd.price = ad.price
      newAd.owner = ad.owner
      newAd.picture = ad.picture
      newAd.location = ad.location
      newAd.category = await Category.findOneByOrFail({ id: ad.category_id })

      await newAd.save()

      return newAd
    }
    catch (error) {
      throw new Error(`Failed to create ad : ${error instanceof Error ? error.message : error}`)
    }
  }

  static async update(id: number, ad: AdType): Promise<Ad | null> {
    try {
      const updateAd = await this.getById(id)

      if (!updateAd) {
        return null
      }

      updateAd.title = ad.title
      updateAd.description = ad.description
      updateAd.price = ad.price
      updateAd.owner = ad.owner
      updateAd.picture = ad.picture
      updateAd.location = ad.location
      updateAd.category = await Category.findOneByOrFail({ id: ad.category_id })

      await updateAd.save()

      return updateAd
    }
    catch (error) {
      throw new Error(`Failed to update ad : ${error instanceof Error ? error.message : error}`)
    }
  }

  static async partialUpdate(id: number, ad: Partial<AdType>): Promise<Ad | null> {
    try {
      const adToUpdate = await Ad.findOneBy({ id })

      if (!adToUpdate) {
        return null
      }

      if (ad.category_id) {
        adToUpdate.category = await Category.findOneByOrFail({ id: ad.category_id })
      }

      Object.assign(adToUpdate, ad)

      const updatedAd = await adToUpdate.save()

      return updatedAd
    }
    catch (error) {
      throw new Error(`Failed to update ad: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  static async deleteById(id: number): Promise<boolean> {
    try {
      const result = await Ad.delete(id)
      return result.affected !== 0 // Retourne true si une annonce a été supprimée
    }
    catch (error) {
      throw new Error(`Failed to delete ad: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  static async deleteAll(): Promise<void> {
    try {
      await Ad.clear()
    }
    catch (error) {
      throw new Error(`Failed to delete all ads: ${error instanceof Error ? error.message : error}`)
    }
  }
}
