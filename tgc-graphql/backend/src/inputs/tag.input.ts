import { InputType, Field, ID } from "type-graphql";

@InputType()
export class TagInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field()
  name!: string;
}

@InputType()
export class TagCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class TagUpdateInput {
  @Field()
  name!: string;
}