import { z } from 'zod'

export const IdSchema = z.number().int().positive()
const NonEmptyStringScheam = z.string().min(1, 'Pattern must be a non-empty string')
const OptionalString = z.string().optional()

export const AdSchema  = z.object({
  title: z.string().min(2, { message: 'Le titre doit avoir au moins 2 caractères.' }),
  description: z.string().optional(),
  price: z.number().min(1, { message: 'Le prix doit être supérieur à 0.' }),
  owner: z.string().min(1, { message: 'Le propriétaire est obligatoire.' }),
  picture: z.string().url({ message: "L'URL de l'image est invalide." }),
  location: z.string().min(2, { message: 'La localisation doit avoir au moins 2 caractères.' }),
  category: z.object({
    id: z.string(),
  }),
  tags: z.array(
    z.object({
      id: IdSchema,
    })
  ).optional(),
})

// Schéma pour le formulaire côté frontend
export const AdFormSchema = AdSchema.extend({
  category: z.object({
    id: z.string(),
    name: z.string().min(1, { message: 'La catégorie doit avoir un nom' }),
  }),
  tags: z.array(
    z.object({
      id: IdSchema,
      name: z.string().min(1, { message: 'Le tag doit avoir un nom' }),
    })
  ).optional(),
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

// Schéma de base pour User
export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' }),
})
