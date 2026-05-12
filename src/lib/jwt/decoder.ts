import { type JwtDecoded } from "@/types/jwt-decoder.types"

export function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/")
  const padding = base64.length % 4
  const padded = padding ? base64 + "=".repeat(4 - padding) : base64
  return atob(padded)
}

export function decodeJwt(token: string): JwtDecoded {
  const parts = token.trim().split(".")
  if (parts.length !== 3) {
    throw new Error("Invalid JWT: must have 3 parts separated by dots")
  }

  const [headerB64, payloadB64, signatureB64] = parts

  const parsedHeader: Record<string, unknown> = JSON.parse(
    base64UrlDecode(headerB64!)
  )
  const parsedPayload: Record<string, unknown> = JSON.parse(
    base64UrlDecode(payloadB64!)
  )

  return {
    header: { name: "header", data: parsedHeader, raw: headerB64! },
    payload: { name: "payload", data: parsedPayload, raw: payloadB64! },
    signature: { raw: signatureB64! },
    isValid: true,
  }
}
