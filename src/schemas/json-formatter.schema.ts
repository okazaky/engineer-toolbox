import { z } from "zod/v4"

export const jsonInputSchema = z.string().min(1, "Input is required")

export const jsonIndentSchema = z.union([
  z.literal(2),
  z.literal(4),
  z.literal(8),
])

export type JsonIndentSchema = z.infer<typeof jsonIndentSchema>
