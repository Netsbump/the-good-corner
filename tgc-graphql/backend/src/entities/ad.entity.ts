import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Category } from './category.entity'
import { Tag } from './tag.entity'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './user.entity'

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column()
  @Field()
  title!: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string

  @Column()
  @Field()
  price!: number

  @Column()
  @Field()
  picture!: string

  @Column()
  @Field()
  location!: string

  @ManyToOne(() => Category, category => category.ads, { nullable: false })
  @Field(() => Category) 
  category!: Category

  @ManyToMany(() => Tag, tag => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[]

  @ManyToOne(() => User, user => user.ads)
  @Field(() => User)
  author!: User 

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field() 
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  updatedAt!: Date
}
