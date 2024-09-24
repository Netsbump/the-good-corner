import { z } from "zod";

export const AdSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  owner: z.string(),
  picture: z.string(),
  location: z.string(),
  createdAt: z.string(),
});

export const AdPatchSchema = AdSchema.pick({
  title: true,
  description: true,
  price: true,
  owner: true,
  picture: true,
  location: true,
}).partial();
