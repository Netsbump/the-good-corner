import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './category.entity'
import { Tag } from './tag.entity'

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text' })
  title!: string

  @Column({ type: 'text', nullable: true })
  description!: string

  @Column({ type: 'real' })
  price!: number

  @Column({ type: 'text' })
  owner!: string

  @Column({ type: 'blob' })
  picture!: string

  @Column({ type: 'text' })
  location!: string

  @ManyToOne(() => Category, category => category.ads, { nullable: false })
  category!: Category

  @ManyToMany(() => Tag, tag => tag.ads)
  @JoinTable()
  tags!: Tag[]

  @CreateDateColumn({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string
}
