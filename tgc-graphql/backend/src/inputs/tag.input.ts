import { InputType, Field, ID } from "type-graphql";

@InputType()
export class TagInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field()
  name!: string;
}
