import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './category.entity'

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

  @ManyToOne(() => Category, { nullable: false }) // Définir la relation correctement
  category!: Category // Utilisez directement l'entité Category

  @CreateDateColumn({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string
}
