import type { z } from 'zod'
import type { AdSchema } from '../schemas/ad.schema'

export type AdType = z.infer<typeof AdSchema>
