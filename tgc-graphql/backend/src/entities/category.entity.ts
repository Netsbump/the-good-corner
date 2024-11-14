import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Ad } from './ad.entity'
import { Field, ID, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ type: 'text' })
  @Field()
  name!: string

  @OneToMany(() => Ad, ad => ad.category)
  @Field(() => [Ad])
  ads!: Ad[]
}
