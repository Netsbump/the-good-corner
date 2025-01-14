import { Field, InputType } from "type-graphql";
import { IsEmail, MinLength, Matches } from "class-validator";

@InputType()
export class UserCreateInput {
  @Field()
  @IsEmail({}, { message: "L'email n'est pas valide" })
  email!: string;

  @Field()
  @MinLength(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial" }
  )
  password!: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  @IsEmail({}, { message: "L'email n'est pas valide" })
  email!: string;

  @Field()
  @MinLength(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  password!: string;
}
