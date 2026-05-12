import { type ValidationResult } from "@/types/common.types"

export function validateJson(input: string): ValidationResult {
  if (!input.trim()) {
    return { valid: false, error: "Input is empty" }
  }

  try {
    JSON.parse(input)
    return { valid: true }
  } catch (e) {
    const error = e instanceof SyntaxError ? e : new SyntaxError("Unknown error")
    const { line, column } = extractErrorPosition(error.message, input)

    return {
      valid: false,
      error: error.message,
      line,
      column,
    }
  }
}

function extractErrorPosition(
  message: string,
  input: string
): { line?: number; column?: number } {
  const positionMatch = message.match(/position\s+(\d+)/i)
  if (!positionMatch) {
    return {}
  }

  const position = parseInt(positionMatch[1], 10)
  const upToPosition = input.slice(0, position)
  const lines = upToPosition.split("\n")
  const line = lines.length
  const column = (lines[lines.length - 1]?.length ?? 0) + 1

  return { line, column }
}
