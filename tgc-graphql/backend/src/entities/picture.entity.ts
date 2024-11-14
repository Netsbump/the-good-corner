import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Picture {

    @Field(type => ID)
    id!: number

    @Field()
    url!: string

}