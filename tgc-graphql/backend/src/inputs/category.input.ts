import { InputType, Field, ID } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field(() => ID, { nullable: true }) // L'ID peut être nullable pour les créations sans ID
  id?: number;

  @Field()
  name!: string;
}