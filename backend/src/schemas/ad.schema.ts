import { z } from 'zod'
import { BORDEAUX, LYON, PARIS } from '../utils/constants'

const categoryIdSchema = z.number().int().positive()
const tagsIdSchema = z.number().int().positive()

export const AdSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  owner: z.string(),
  picture: z.string(),
  location: z.enum([PARIS, BORDEAUX, LYON]),
  category: categoryIdSchema,
  tags: z.array(z.object({
    id: tagsIdSchema,
  })).optional(),
})

export const AdPatchSchema = AdSchema.pick({
  title: true,
  description: true,
  price: true,
  owner: true,
  picture: true,
  location: true,
  category: true,
  tags: true,
}).partial()

export const querySchema = z.object({
  category_ids: z.string().optional(),
})

export const AdIdSchema = z.number().int().positive()
