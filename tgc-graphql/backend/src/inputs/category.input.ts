import { InputType, Field, ID } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field(() => ID, { nullable: true }) // L'ID peut être nullable pour les créations sans ID
  id?: string;

  @Field({nullable: true})
  name?: string;
}

@InputType()
export class CategoryCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class CategoryUpdateInput {
  @Field()
  name!: string;
}