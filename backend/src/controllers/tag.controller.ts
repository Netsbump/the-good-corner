import type { Request, Response } from 'express'
import type { TagService } from '../services/tag.service'
import type { TagType } from '../utils/types'
import { TagIdSchema, TagSchema } from '../schemas/tag.schema'

export class TagController {
  constructor(private readonly tagsService: TagService) {}

  public async getAll(_: Request, res: Response) {
    try {
      const tags = await this.tagsService.getAll()
      return res.status(200).json(tags)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to retrieve tags: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const parsedTag = TagSchema.safeParse(req.body)

      if (!parsedTag.success) {
        return res.status(400).json({ error: 'Invalid tag format', details: parsedTag.error.errors })
      }

      const newTag: TagType = parsedTag.data

      const tagCreated = await this.tagsService.create(newTag)
      return res.status(201).json(tagCreated)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to create tag: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parsedId = TagIdSchema.safeParse(id)

      if (!parsedId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const parseTag = TagSchema.safeParse(req.body)

      if (!parseTag.success) {
        return res.status(400).json({ error: 'Invalid tag format', details: parseTag.error.errors })
      }

      const updateTag: TagType = parseTag.data
      const idUpdate = parsedId.data

      const updatedTag = await this.tagsService.update(idUpdate, updateTag)
      if (!updatedTag) {
        return res.status(404).json('Tag not found')
      }
      return res.status(200).json(updatedTag)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to update tag: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseId = TagIdSchema.safeParse(id)

      if (!parseId.success) {
        return res.status(400).json('Invalid ID format')
      }

      const deletedTag = await this.tagsService.deleteById(parseId.data)

      if (!deletedTag) {
        res.status(500).json('Tag not found')
      }
      return res.status(200).json({ message: 'Tag deleted', id: parseId.data })
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to delete tag: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }
}
