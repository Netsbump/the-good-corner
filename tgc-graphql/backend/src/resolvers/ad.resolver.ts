import { Arg, ID, Mutation, Query, Resolver, Field, InputType, Float } from 'type-graphql';
import { Ad } from '../entities/ad.entity';
import { AdService } from '../services/ad.service';
import { AdPatchSchema, AdSchema, IdSchema, querySchema } from '@tgc/packages';
import { AdInput } from '../inputs/ad.input';
import { Service } from 'typedi';
import { Authorized } from 'type-graphql';
import { Ctx } from 'type-graphql';
import { AuthContext } from '../types/auth-checker';

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
  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Arg("adData") adData: AdInput,
    @Ctx() { user }: AuthContext
  ): Promise<Ad> {
    return this.adsService.create(adData, user!.userId);
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
