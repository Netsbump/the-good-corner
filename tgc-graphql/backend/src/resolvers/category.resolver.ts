import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Category } from '../entities/category.entity'
import { CategoryService } from '../services/category.service'
import { CategorySchema, IdSchema } from '@tgc/packages'
import { CategoryInput } from '../inputs/category.input'
import { Service } from 'typedi';

@Service()
@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoriesService: CategoryService) {}

  @Query(() => [Category])
  public async categories(): Promise<Category[]> {
    try {
      return await this.categoriesService.getAll()
    }
    catch (error) {
        throw new Error(`Failed to retrieve categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  @Query(() => Category, { nullable: true })
  public async category(@Arg("id", () => ID) id: number): Promise<Category | null> {
   
    const parsedId = IdSchema.safeParse(id);

    if (!parsedId.success) {
    throw new Error('Invalid ID format');
    }

    const category = await this.categoriesService.getById(parsedId.data)
    if (!category) {
    throw new Error('Category not found');
    }

    return category
  }

  @Mutation(()  => Category, { nullable: true })
  public async createCategory(@Arg("categoryData") categoryData: CategoryInput): Promise<Category> {
    const parseCategory = CategorySchema.safeParse(categoryData);

    if (!parseCategory.success) {
      throw new Error(`Invalid category format: ${parseCategory.error.errors.map(e => e.message).join(", ")}`);
    }

    return await this.categoriesService.create(parseCategory.data);
  }

  @Mutation(()  => Category, { nullable: true })
  public async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("categoryData", () => CategoryInput) categoryData: CategoryInput
  ): Promise<Category | null> {
    const parsedId = IdSchema.safeParse(id);

    if (!parsedId.success) {
      throw new Error('Invalid ID format');
    }

    const parseCategory = CategorySchema.safeParse(categoryData);

    if (!parseCategory.success) {
      throw new Error(`Invalid category format: ${parseCategory.error.errors.map(e => e.message).join(", ")}`);
    }

    const updatedCategory = await this.categoriesService.update(parsedId.data, parseCategory.data);
    if (!updatedCategory) {
      throw new Error('Category not found');
    }

    return updatedCategory;
  }

  // Mutation to delete a category by ID
  @Mutation(()  => Boolean)
  public async deleteCategory(@Arg("id", () => ID) id: number): Promise<boolean> {
    const parseId = IdSchema.safeParse(id);

    if (!parseId.success) {
      throw new Error('Invalid ID format');
    }

    const deletedCategory = await this.categoriesService.deleteById(parseId.data);

    if (!deletedCategory) {
      throw new Error('Category not found');
    }

    return true;
  }
}
