import { z } from 'zod'

export const TagSchema = z.object({
  name: z.string().min(1, 'Pattern must be a non-empty string'),
})

export const TagIdSchema = z.number().int().positive()
