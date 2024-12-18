import { DataSource } from 'typeorm'
import { Ad } from './entities/ad.entity'
import { Category } from './entities/category.entity'
import { Tag } from './entities/tag.entity'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'example',
  database: process.env.POSTGRES_DB || 'tgc',
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: true,
})
