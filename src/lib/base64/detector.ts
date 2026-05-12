import { type Base64DetectionResult } from "@/types/base64.types"

const BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/

export function detectBase64(input: string): Base64DetectionResult {
  const trimmed = input.trim()

  if (!trimmed) {
    return { isBase64: false, confidence: 0 }
  }

  if (!BASE64_REGEX.test(trimmed)) {
    return { isBase64: false, confidence: 0 }
  }

  if (trimmed.length % 4 !== 0) {
    return { isBase64: false, confidence: 0.2 }
  }

  try {
    atob(trimmed)
  } catch {
    return { isBase64: false, confidence: 0.1 }
  }

  const hasUpperAndLower = /[A-Z]/.test(trimmed) && /[a-z]/.test(trimmed)
  const hasDigits = /\d/.test(trimmed)
  const hasPadding = trimmed.endsWith("=")
  const isLongEnough = trimmed.length >= 4

  let confidence = 0.5
  if (hasUpperAndLower) confidence += 0.1
  if (hasDigits) confidence += 0.1
  if (hasPadding) confidence += 0.15
  if (isLongEnough) confidence += 0.1
  if (trimmed.length >= 20) confidence += 0.05

  return {
    isBase64: confidence >= 0.7,
    confidence: Math.min(confidence, 1),
  }
}
