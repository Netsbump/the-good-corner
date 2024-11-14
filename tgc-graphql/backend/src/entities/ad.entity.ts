import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './category.entity'
import { Tag } from './tag.entity'
import { Field, ID, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ type: 'text' })
  @Field()
  title!: string

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description!: string

  @Column({ type: 'real' })
  @Field()
  price!: number

  @Column({ type: 'text' })
  @Field()
  owner!: string

  @Column({ type: 'blob' })
  @Field()
  picture!: string

  @Column({ type: 'text' })
  @Field()
  location!: string

  @ManyToOne(() => Category, category => category.ads, { nullable: false })
  @Field(() => Category) 
  category!: Category

  @ManyToMany(() => Tag, tag => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[]

  @CreateDateColumn({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
  @Field() 
  createdAt!: string
}
