import { z } from "zod";
import { AdSchema } from "../schemas/ad.schema";

export type Ad = z.infer<typeof AdSchema>;
