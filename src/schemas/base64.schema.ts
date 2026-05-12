import { z } from "zod/v4"

export const base64InputSchema = z.string().min(1, "Input is required")

export const base64DirectionSchema = z.enum(["encode", "decode"])

export type Base64DirectionSchema = z.infer<typeof base64DirectionSchema>
