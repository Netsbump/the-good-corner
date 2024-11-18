import { Arg, ID, Mutation, Query, Resolver, Field, InputType, Float } from 'type-graphql';
import { Ad } from '../entities/ad.entity';
import { AdService } from '../services/ad.service';
import { AdPatchSchema, AdSchema, IdSchema, querySchema } from '@tgc/packages';
import { AdInput } from '../inputs/ad.input';
import { Service } from 'typedi';

@Service()
@Resolver(() => Ad)
export class AdResolver {
  constructor(private readonly adsService: AdService) {}

  @Query(() => [Ad])
  public async ads(
    @Arg("categoryIds", () => [ID], { nullable: true }) categoryIds?: string[]
  ): Promise<Ad[]> {
    return this.adsService.getAll(categoryIds);
  }

  // Query to get an ad by ID
  @Query(() => Ad, { nullable: true })
  public async ad(@Arg("id", () => ID) id: string): Promise<Ad | null> {
    
    const numericId = Number(id);
    const parseAdId = IdSchema.safeParse(numericId);

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
    // const parseAd = AdSchema.safeParse(adData);
    // if (!parseAd.success) {
    //   throw new Error(`Invalid Ad format: ${parseAd.error.errors.map(e => e.message).join(", ")}`);
    // }

    return await this.adsService.create(adData);
  }

  // Mutation to update an existing ad
  @Mutation(() => Ad, { nullable: true })
  public async updateAd(
    @Arg("id", () => ID) id: number,
    @Arg("adData", () => AdInput) adData: AdInput
  ): Promise<Ad | null> {

    const numericId = Number(id);
    const parseUpdateAdId = IdSchema.safeParse(numericId);
    if (!parseUpdateAdId.success) {
      throw new Error('Invalid ID format');
    }

    // const parseAd = AdSchema.safeParse(adData);
    // if (!parseAd.success) {
    //   throw new Error(`Invalid Ad format: ${parseAd.error.errors.map(e => e.message).join(", ")}`);
    // }

    const updatedAd = await this.adsService.update(parseUpdateAdId.data, adData);
    if (!updatedAd) {
      throw new Error('Ad not found');
    }

    return updatedAd;
  }

  // Mutation to delete an ad by ID
  @Mutation(() => Boolean)
  public async deleteAd(@Arg("id", () => ID) id: string): Promise<boolean> {
    const numericId = Number(id);
    const parseAdId = IdSchema.safeParse(numericId);

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

}
