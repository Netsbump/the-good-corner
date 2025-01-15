import type { Repository } from 'typeorm'
import type { Tag } from '../entities/tag.entity'
import { Service, Inject } from 'typedi'
import { TagCreateInput } from '../inputs/tag.input'

@Service()
export class TagService {
  constructor(
    @Inject("TagRepository") 
    private readonly tagsRepository: Repository<Tag>
  ) {}

  public async getAll() {
    try {
      return await this.tagsRepository.find({ relations: ["ads"]})
    }
    catch (error) {
      throw new Error(`Failed to retrieve tags: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  public async create(tag: TagCreateInput): Promise<Tag> {
    try {
      const newTag = this.tagsRepository.create()

      newTag.name = tag.name.toLocaleLowerCase()

      await this.tagsRepository.save(newTag)

      return newTag
    }
    catch (error) {
      throw new Error(`Failed to create tag: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  public async update(id: number, tag: TagCreateInput): Promise<Tag> {
    try {
      const tagToUpdate = await this.tagsRepository.findOneBy({ id })

      if (!tagToUpdate) {
        throw new Error('Tag not found')
      }
      tagToUpdate.name = tag.name.toLowerCase()

      await this.tagsRepository.save(tagToUpdate)

      return tagToUpdate
    }
    catch (error) {
      throw new Error(`Failed to update category : ${error instanceof Error ? error.message : error}`)
    }
  }

  public async deleteById(id: number): Promise<boolean> {
    try {
      const result = await this.tagsRepository.delete(id)
      return result.affected !== 0
    }
    catch (error) {
      throw new Error(`Failed to delete tag: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
