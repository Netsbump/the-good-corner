import type { z } from 'zod'
import type { AdSchema } from '../schemas/ad.schema'
import type { CategorySchema } from '../schemas/category.schema'
import type { TagSchema } from '../schemas/tag.schema'

export type AdType = z.infer<typeof AdSchema>
export type CategoryType = z.infer<typeof CategorySchema>
export type TagType = z.infer<typeof TagSchema>
