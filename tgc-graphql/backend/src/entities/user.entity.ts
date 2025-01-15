import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ad } from "./ad.entity";

@Entity()
@ObjectType()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @OneToMany(() => Ad, ad => ad.author)
  @Field(() => [Ad])
  ads!: Ad[]

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  hashedPassword!: string;
}

