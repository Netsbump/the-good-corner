import type { AdDtoToCreate } from '@tgc/packages'
import type { Repository } from 'typeorm'
import type { Ad } from '../entities/ad.entity'
import type { Category } from '../entities/category.entity'
import type { Tag } from '../entities/tag.entity'
import { In } from 'typeorm'
import { Service, Inject } from 'typedi'
import { AdInput } from '../inputs/ad.input'

@Service()
export class AdService {
  constructor(
     @Inject("AdRepository") 
     private readonly adsRepository: Repository<Ad>, 
     @Inject("CategoryRepository") 
     private readonly categoryRepository: Repository<Category>, 
     @Inject("TagRepository") 
     private readonly tagRepository: Repository<Tag>
  ) {}

  public async getAll(categoryIds?: string[]): Promise<Ad[]> {
    if (categoryIds && categoryIds.length > 0) {
      return await this.adsRepository.find({
        where: { category: { id: In(categoryIds) } },
        relations: ['category', 'tags'],
        order: { category: { id: 'ASC' } },
      });
    }

    return await this.adsRepository.find({
      relations: ['category', 'tags'],
    });
  }

  public async getById(id: number): Promise<Ad | null> {
    const ad = await this.adsRepository.findOne({
      where: { id },
      relations: ['category', 'tags'],
    })
    return ad || null
  }

  public async create(ad: AdInput): Promise<Ad> {
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
      const categoryId = Number(ad.category.id)
      newAd.category = await this.categoryRepository.findOneByOrFail({ id: categoryId })

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

  public async update(id: number, ad: AdInput): Promise<Ad | null> {
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
      const categoryId = Number(ad.category.id)
      updateAd.category = await this.categoryRepository.findOneByOrFail({ id: categoryId })

      await this.adsRepository.save(updateAd)

      return updateAd
    }
    catch (error) {
      throw new Error(`Failed to update ad : ${error instanceof Error ? error.message : error}`)
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
