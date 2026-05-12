import { type ExpirationInfo } from "@/types/jwt-decoder.types"

export function computeExpirationInfo(
  iat?: number,
  exp?: number
): ExpirationInfo {
  const now = Date.now()
  const expiresAt = exp ? new Date(exp * 1000) : null
  const issuedAt = iat ? new Date(iat * 1000) : null

  const isExpired = expiresAt ? now > expiresAt.getTime() : false

  let percentage = 0
  if (issuedAt && expiresAt) {
    const total = expiresAt.getTime() - issuedAt.getTime()
    const elapsed = now - issuedAt.getTime()
    percentage =
      total > 0 ? Math.min(Math.max((elapsed / total) * 100, 0), 100) : 100
  }

  const timeRemaining = computeTimeRemaining(expiresAt, isExpired)

  return {
    isExpired,
    percentage,
    timeRemaining,
    issuedAt,
    expiresAt,
  }
}

function computeTimeRemaining(
  expiresAt: Date | null,
  isExpired: boolean
): string {
  if (!expiresAt) return "No expiration"
  if (isExpired) return "Expired"

  const now = Date.now()
  const remaining = expiresAt.getTime() - now
  const seconds = Math.floor(remaining / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ${hours % 24}h remaining`
  if (hours > 0) return `${hours}h ${minutes % 60}m remaining`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s remaining`
  return `${seconds}s remaining`
}
