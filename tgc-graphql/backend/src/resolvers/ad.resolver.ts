import { Arg, ID, Mutation, Query, Resolver, Field, InputType, Float } from 'type-graphql';
import { Ad } from '../entities/ad.entity';
import { AdService } from '../services/ad.service';
import { AdPatchSchema, AdSchema, IdSchema, querySchema } from '@tgc/packages';
import { AdInput, PartialAdInput } from '../inputs/ad.input';
import { Service } from 'typedi';

@Service()
@Resolver(() => Ad)
export class AdResolver {
  constructor(private readonly adsService: AdService) {}

  // Query to get all ads with optional category filter
  @Query(() => [Ad])
  public async getAllAds(@Arg("categoryIds", () => [ID], { nullable: true }) categoryIds?: number[]): Promise<Ad[]> {
    const parseResult = querySchema.safeParse({ category_ids: categoryIds });
    if (!parseResult.success) {
      throw new Error('Invalid query parameters');
    }

    const { category_ids } = parseResult.data;
    return category_ids
      ? await this.adsService.getAllByCategory(category_ids)
      : await this.adsService.getAll();
  }

  // Query to get an ad by ID
  @Query(() => Ad, { nullable: true })
  public async getAdById(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const parseAdId = IdSchema.safeParse(id);
    if (!parseAdId.success) {
      throw new Error('Invalid ID format');
    }

    const ad = await this.adsService.getById(parseAdId.data);
    if (!ad) {
      throw new Error('Ad not found');
    }

    return ad;
  }

  // Mutation to create a new ad
  @Mutation(() => Ad)
  public async createAd(@Arg("adData") adData: AdInput): Promise<Ad> {
    const parseAd = AdSchema.safeParse(adData);
    if (!parseAd.success) {
      throw new Error(`Invalid Ad format: ${parseAd.error.errors.map(e => e.message).join(", ")}`);
    }

    return await this.adsService.create(parseAd.data);
  }

  // Mutation to update an existing ad
  @Mutation(() => Ad, { nullable: true })
  public async updateAd(
    @Arg("id", () => ID) id: number,
    @Arg("adData", () => AdInput) adData: AdInput
  ): Promise<Ad | null> {
    const parseUpdateAdId = IdSchema.safeParse(id);
    if (!parseUpdateAdId.success) {
      throw new Error('Invalid ID format');
    }

    const parseAd = AdSchema.safeParse(adData);
    if (!parseAd.success) {
      throw new Error(`Invalid Ad format: ${parseAd.error.errors.map(e => e.message).join(", ")}`);
    }

    const updatedAd = await this.adsService.update(parseUpdateAdId.data, parseAd.data);
    if (!updatedAd) {
      throw new Error('Ad not found');
    }

    return updatedAd;
  }

  // Mutation to partially update an ad
  @Mutation(() => Ad, { nullable: true })
  public async partialUpdateAd(
    @Arg("id", () => ID) id: number,
    @Arg("updateFields", () => PartialAdInput) updateFields: PartialAdInput
  ): Promise<Ad | null> {
    const parseUpdateAdId = IdSchema.safeParse(id);
    if (!parseUpdateAdId.success) {
      throw new Error('Invalid ID format');
    }

    const parsePartialAd = AdPatchSchema.safeParse(updateFields);
    if (!parsePartialAd.success) {
      throw new Error(`Invalid partial Ad format: ${parsePartialAd.error.errors.map(e => e.message).join(", ")}`);
    }

    const updatedAd = await this.adsService.partialUpdate(parseUpdateAdId.data, parsePartialAd.data);
    if (!updatedAd) {
      throw new Error('Ad not found');
    }

    return updatedAd;
  }

  // Mutation to delete an ad by ID
  @Mutation(() => Boolean)
  public async deleteAdById(@Arg("id", () => ID) id: number): Promise<boolean> {
    const parseAdId = IdSchema.safeParse(id);
    if (!parseAdId.success) {
      throw new Error('Invalid ID format');
    }

    const deletedAd = await this.adsService.deleteById(parseAdId.data);
    if (!deletedAd) {
      throw new Error('Ad not found');
    }

    return true;
  }

  // Mutation to delete all ads
  @Mutation(() => Boolean)
  public async deleteAllAds(): Promise<boolean> {
    await this.adsService.deleteAll();
    return true;
  }

//   // Example query to get average price by category ID
//   @Query(() => Number, { nullable: true })
//   public async getAveragePriceByCategory(@Arg("categoryId", () => ID) categoryId: number): Promise<number | null> {
//     if (isNaN(categoryId)) {
//       throw new Error('Invalid Category ID format');
//     }

//     const averagePrice = await this.adsService.getAveragePriceByCategory(categoryId);
//     if (averagePrice === null) {
//       throw new Error('Category not found or no ads in this category');
//     }

//     return averagePrice;
//   }
}
