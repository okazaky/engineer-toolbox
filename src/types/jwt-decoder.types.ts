export interface JwtSection {
  readonly name: "header" | "payload" | "signature"
  readonly data: Record<string, unknown>
  readonly raw: string
}

export interface JwtDecoded {
  readonly header: JwtSection
  readonly payload: JwtSection
  readonly signature: { readonly raw: string }
  readonly isValid: boolean
}

export interface ExpirationInfo {
  readonly isExpired: boolean
  readonly percentage: number
  readonly timeRemaining: string
  readonly issuedAt: Date | null
  readonly expiresAt: Date | null
}

export interface JwtFieldMeta {
  readonly name: string
  readonly description: string
}
