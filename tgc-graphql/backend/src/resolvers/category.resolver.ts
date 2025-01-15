import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Category } from '../entities/category.entity'
import { CategoryService } from '../services/category.service'
import { CategoryCreateInput, CategoryInput, CategoryUpdateInput } from '../inputs/category.input'
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
  public async category(@Arg("id", () => ID) id: number): Promise<Category> {
    const category = await this.categoriesService.getById(id)
    if (!category) {
      throw new Error('Category not found');
    }
    return category
  }

  @Mutation(()  => Category, { nullable: true })
  public async createCategory(@Arg("categoryData") categoryData: CategoryCreateInput): Promise<Category> {
    return await this.categoriesService.create(categoryData);
  }

  @Mutation(()  => Category, { nullable: true })
  public async updateCategory(
    @Arg("id", () => ID) id: number,
    @Arg("categoryData", () => CategoryInput) categoryDataToUpdate: CategoryUpdateInput
  ): Promise<Category> {
    const updatedCategory = await this.categoriesService.update(id, categoryDataToUpdate);

    if (!updatedCategory) {
      throw new Error('Category not found');
    }

    return updatedCategory;
  }

  // Mutation to delete a category by ID
  @Mutation(()  => Boolean)
  public async deleteCategory(@Arg("id", () => ID) id: number): Promise<boolean> {
    const deletedCategory = await this.categoriesService.deleteById(id);

    if (!deletedCategory) {
      throw new Error('Category not found');
    }

    return true;
  }
}
