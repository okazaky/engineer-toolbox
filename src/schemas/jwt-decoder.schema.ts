import { z } from "zod/v4"

const JWT_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/

export const jwtInputSchema = z
  .string()
  .min(1, "JWT token is required")
  .regex(JWT_REGEX, "Invalid JWT format")
