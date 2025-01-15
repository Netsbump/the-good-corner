import { InputType, Field, Float } from "type-graphql";
import { TagInput } from "./tag.input";
import { CategoryInput } from "./category.input";
import { MinLength, IsNumber, Min, IsUrl } from "class-validator";

@InputType()
export class AdInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price!: number;

  @Field()
  author!: string;

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
export class AdCreateInput {
  @Field()
  @MinLength(2, { message: 'Le titre doit avoir au moins 2 caractères.' })
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  @IsNumber()
  @Min(1, { message: 'Le prix doit être supérieur à 0.' })
  price!: number;

  @Field()
  author!: string;
  
  @Field()
  @IsUrl(undefined, { message: "L'URL de l'image est invalide." })
  picture!: string;

  @Field()
  location!: string;  

  @Field()
  category!: CategoryInput;

  @Field(() => [TagInput], { nullable: true })
  tags?: TagInput[];
}

@InputType()
export class AdUpdateInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  category?: CategoryInput;

  @Field(() => [TagInput], { nullable: true })
  tags?: TagInput[];
}