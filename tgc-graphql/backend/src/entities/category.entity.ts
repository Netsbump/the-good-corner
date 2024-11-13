import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Ad } from './ad.entity'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text' })
  name!: string

  @OneToMany(() => Ad, ad => ad.category)
  ads!: Ad[]
}
