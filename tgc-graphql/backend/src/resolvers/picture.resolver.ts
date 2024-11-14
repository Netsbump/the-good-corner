import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { PictureService } from "../services/picture.service";
import { Picture } from "../entities/picture.entity";

@Resolver(Picture)
export class PictureResolver {
    constructor(private readonly picturesService: PictureService) {}

    @Query(returns => Picture)
    public async picture(@Arg("id", () => ID) id: number){
        return 1
    }

    @Mutation(returns => Picture)
    public async addPicture(){
        return []
    }
}