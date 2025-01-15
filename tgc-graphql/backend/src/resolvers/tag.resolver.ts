import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Tag } from '../entities/tag.entity';
import { TagService } from '../services/tag.service';
import { TagCreateInput, TagInput, TagUpdateInput } from '../inputs/tag.input';
import { Service } from 'typedi';

@Service()
@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagsService: TagService) {}

  @Query(() => [Tag])
  public async tags(): Promise<Tag[]> {
    try {
      return await this.tagsService.getAll();
    } catch (error) {
      throw new Error(`Failed to retrieve tags: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  @Mutation(() => Tag)
  public async createTag(@Arg("tagData") tagDataToCreate: TagCreateInput): Promise<Tag> {
    return await this.tagsService.create(tagDataToCreate);
  }

  @Mutation(() => Tag, { nullable: true })
  public async updateTag(
    @Arg("id", () => ID) id: number,
    @Arg("tagData", () => TagInput) tagDataToUpdate: TagUpdateInput
  ): Promise<Tag> {
    const updatedTag = await this.tagsService.update(id, tagDataToUpdate);
    if (!updatedTag) {
      throw new Error('Tag not found');
    }

    return updatedTag;
  }

  @Mutation(() => Boolean)
  public async deleteTag(@Arg("id", () => ID) id: number): Promise<boolean> {
    const deletedTag = await this.tagsService.deleteById(id);
    if (!deletedTag) {
      throw new Error('Tag not found');
    }

    return true;
  }
}
