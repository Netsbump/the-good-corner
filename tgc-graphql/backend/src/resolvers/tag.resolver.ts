import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Tag } from '../entities/tag.entity';
import { TagService } from '../services/tag.service';
import { IdSchema, TagSchema } from '@tgc/packages';
import { TagInput } from '../inputs/tag.input';
import { Service } from 'typedi';

@Service()
@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagsService: TagService) {}

  // Query to get all tags
  @Query(() => [Tag])
  public async tags(): Promise<Tag[]> {
    try {
      return await this.tagsService.getAll();
    } catch (error) {
      throw new Error(`Failed to retrieve tags: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Mutation to create a new tag
  @Mutation(() => Tag)
  public async createTag(@Arg("tagData") tagData: TagInput): Promise<Tag> {
    const parsedTag = TagSchema.safeParse(tagData);

    if (!parsedTag.success) {
      throw new Error(`Invalid tag format: ${parsedTag.error.errors.map(e => e.message).join(", ")}`);
    }

    return await this.tagsService.create(parsedTag.data);
  }

  // Mutation to update an existing tag
  @Mutation(() => Tag, { nullable: true })
  public async updateTag(
    @Arg("id", () => ID) id: number,
    @Arg("tagData", () => TagInput) tagData: TagInput
  ): Promise<Tag | null> {
    const parsedId = IdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new Error('Invalid ID format');
    }

    const parseTag = TagSchema.safeParse(tagData);
    if (!parseTag.success) {
      throw new Error(`Invalid tag format: ${parseTag.error.errors.map(e => e.message).join(", ")}`);
    }

    const updatedTag = await this.tagsService.update(parsedId.data, parseTag.data);
    if (!updatedTag) {
      throw new Error('Tag not found');
    }

    return updatedTag;
  }

  // Mutation to delete a tag by ID
  @Mutation(() => Boolean)
  public async deleteTag(@Arg("id", () => ID) id: number): Promise<boolean> {
    const parsedId = IdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new Error('Invalid ID format');
    }

    const deletedTag = await this.tagsService.deleteById(parsedId.data);
    if (!deletedTag) {
      throw new Error('Tag not found');
    }

    return true;
  }
}
