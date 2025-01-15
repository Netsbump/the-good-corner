import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Ad } from '../entities/ad.entity';
import { AdService } from '../services/ad.service';
import { AdCreateInput, AdUpdateInput } from '../inputs/ad.input';
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

  @Query(() => Ad, { nullable: true })
  public async ad(@Arg("id", () => ID) id: number): Promise<Ad> {
    const ad = await this.adsService.getById(id);
    
    if (!ad) {
      throw new Error('Ad not found');
    }

    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Arg("adData") adToCreate: AdCreateInput,
    @Ctx() { user }: AuthContext
  ): Promise<Ad> {
    return this.adsService.create(adToCreate, user!.userId);
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  public async updateAd(
    @Arg("id", () => ID) id: number,
    @Arg("adData", () => AdUpdateInput) adToUpdate: AdUpdateInput
  ): Promise<Ad> {
    const updatedAd = await this.adsService.update(id, adToUpdate);
    if (!updatedAd) {
      throw new Error('Ad not found');
    }

    return updatedAd;
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async deleteAd(@Arg("id", () => ID) id: number): Promise<boolean> {
    const deletedAd = await this.adsService.deleteById(id);
    if (!deletedAd) {
      throw new Error('Ad not found');
    }

    return true;
  }

  @Authorized(['SUPER_ADMIN'])
  @Mutation(() => Boolean)
  public async deleteAllAds(): Promise<boolean> {
    await this.adsService.deleteAll();
    return true;
  }

}
