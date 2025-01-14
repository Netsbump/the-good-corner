import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class AuthResponse {
  @Field()
  token!: string;

  @Field(() => User)
  user!: User;
} 