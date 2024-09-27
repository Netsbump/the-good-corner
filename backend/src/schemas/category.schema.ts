import { z } from 'zod'

export const CategoryQueryPatternSchema = z.object({
  category_pattern: z.string().min(1, 'Pattern must be a non-empty string').optional(),
})

export const CategorySchema = z.object({
  name: z.string(),
})

export const CategoryIdSchema = z.number().int().positive()
