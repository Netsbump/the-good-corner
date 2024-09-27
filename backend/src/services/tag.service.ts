import type { Repository } from 'typeorm'
import type { Tag } from '../entities/tag.entity'

export class TagService {
  constructor(private readonly tagsRepository: Repository<Tag>) {}

  public async getAll() {
    try {
      return await this.tagsRepository.find()
    }
    catch (error) {
      throw new Error(`Failed to retrieve categories: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
