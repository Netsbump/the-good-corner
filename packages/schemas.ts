import { z } from 'zod'

const IdSchema = z.number().int().positive()
const NonEmptyStringScheam = z.string().min(1, 'Pattern must be a non-empty string')
const OptionalString = z.string().optional()

export const AdSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  owner: z.string(),
  picture: z.string(),
  location: z.string(),
  category: IdSchema,
  tags: z.array(z.object({
    id: IdSchema,
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
  category_ids: OptionalString,
})

export const CategorySchema = z.object({
  name: NonEmptyStringScheam
})

export const TagSchema = z.object({
  name: NonEmptyStringScheam
})

