import { InputType, Field, Float } from "type-graphql";
import { TagInput } from "./tag.input";
import { CategoryInput } from "./category.input";

@InputType()
export class AdInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price!: number;

  @Field()
  owner!: string;

  @Field()
  picture!: string;

  @Field()
  location!: string;

  @Field(() => CategoryInput)
  category!: CategoryInput;

  @Field(() => [TagInput], { nullable: true })
  tags?: TagInput[];
}

@InputType()
export class PartialAdInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => CategoryInput, { nullable: true })
  category?: CategoryInput;

  @Field(() => [TagInput], { nullable: true })
  tags?: TagInput[];
}