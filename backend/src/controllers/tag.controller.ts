import type { Request, Response } from 'express'
import type { TagService } from '../services/tag.service'

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
}
