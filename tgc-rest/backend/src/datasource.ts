import { DataSource } from 'typeorm'
import { Ad } from './entities/ad.entity'
import { Category } from './entities/category.entity'
import { Tag } from './entities/tag.entity'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db/good_corner.sqlite',
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: true,
})
