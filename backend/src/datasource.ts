import { DataSource } from 'typeorm'
import { Ad } from './entities/ad.entity'
import { Category } from './entities/category.entity'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db/good_corner.sqlite',
  entities: [Ad, Category],
  synchronize: true,
  logging: true,
})
