import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Ad } from './ad.entity'
import { Field, ID, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column()
  @Field()
  name!: string

  @ManyToMany(() => Ad, ad => ad.tags)
  @Field(() => [Ad])
  ads!: Ad[]
}
