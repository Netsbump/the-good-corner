import type { Request, Response } from 'express'
import type { CategoryService } from '../services/category.service'
import type { CategoryType } from '../utils/types'
import { CategoryIdSchema, CategorySchema } from '../schemas/category.schema'

export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  public async getAll(_: Request, res: Response) {
    try {
      const categories = await this.categoriesService.getAll()
      return res.status(200).json(categories)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to retrieve categories: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parsedId = CategoryIdSchema.safeParse(id)

      if (!parsedId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const category = await this.categoriesService.getById(parsedId.data)
      if (!category) {
        return res.status(500).json('Category not found')
      }

      return res.json(category)
    }
    catch (error) {
      return res.status(500).json(`Internal Server Error : ${error}`)
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const parseCategory = CategorySchema.safeParse(req.body)

      if (!parseCategory.success) {
        return res.status(400).json({ error: 'Invalid category format', details: parseCategory.error.errors })
      }

      const newCategory: CategoryType = parseCategory.data

      const createdCategory = await this.categoriesService.create(newCategory)
      return res.status(201).json(createdCategory)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to create category: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parsedId = CategoryIdSchema.safeParse(id)

      if (!parsedId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const parseCategory = CategorySchema.safeParse(req.body)

      if (!parseCategory.success) {
        return res.status(400).json({ error: 'Invalid category format', details: parseCategory.error.errors })
      }

      const updateCategory: CategoryType = parseCategory.data
      const idUpdate = parsedId.data

      const updatedCategory = await this.categoriesService.update(idUpdate, updateCategory)
      if (!updateCategory) {
        return res.status(404).json('Category not found')
      }
      return res.status(200).json(updatedCategory)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to update category: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseId = CategoryIdSchema.safeParse(id)

      if (!parseId.success) {
        return res.status(400).json('Invalid ID format')
      }

      const deletedCategory = await this.categoriesService.deleteById(parseId.data)

      if (!deletedCategory) {
        res.status(500).json('Category not found')
      }
      return res.status(200).json({ message: 'Category deleted', id: parseId.data })
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to delete category: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }
}
