import type { z } from 'zod'
import type { AdSchema } from '../schemas/ad.schema'

export type Ad = z.infer<typeof AdSchema>
