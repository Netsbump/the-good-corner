import type { Repository } from 'typeorm'
import type { Category } from '../entities/category.entity'
import { Service, Inject } from 'typedi';
import { CategoryCreateInput } from '../inputs/category.input';

@Service()
export class CategoryService {
  constructor(
    @Inject("CategoryRepository") 
    private readonly categoriesRepository: Repository<Category>
  ) {}
  
  public async getAll(): Promise<Category[]> {
    try {
      return await this.categoriesRepository.find({ relations: ['ads']})
    }
    catch (error) {
      throw new Error(`Failed to retrieve categories: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  public async getById(id: number): Promise<Category | null> {
    const category = await this.categoriesRepository.findOneBy({ id })
    return category || null
  }

  public async create(category: CategoryCreateInput): Promise<Category> {
    try {
      const newCategory = this.categoriesRepository.create({
        ...category,
        name: category.name.toLowerCase(),
      })

      await this.categoriesRepository.save(newCategory)

      return newCategory
    }
    catch (error) {
      throw new Error(`Failed to create category : ${error instanceof Error ? error.message : error}`)
    }
  }

  public async update(id: number, category: CategoryCreateInput): Promise<Category | null> {
    try {
      const categoryToUpdate = await this.categoriesRepository.findOneBy({ id })

      if (!categoryToUpdate) {
        return null
      }
      categoryToUpdate.name = category.name.toLowerCase()

      await this.categoriesRepository.save(categoryToUpdate)

      return categoryToUpdate
    }
    catch (error) {
      throw new Error(`Failed to update category : ${error instanceof Error ? error.message : error}`)
    }
  }

  public async deleteById(id: number): Promise<boolean> {
    try {
      const result = await this.categoriesRepository.delete(id)
      return result.affected !== 0
    }
    catch (error) {
      throw new Error(`Failed to delete category: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
