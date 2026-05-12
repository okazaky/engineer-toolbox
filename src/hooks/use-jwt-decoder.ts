"use client"

import { useState, useMemo, useCallback } from "react"
import {
  type JwtDecoded,
  type ExpirationInfo,
} from "@/types/jwt-decoder.types"
import { decodeJwt } from "@/lib/jwt/decoder"
import { computeExpirationInfo } from "@/lib/jwt/expiration"
import { useDebounce } from "./use-debounce"

export function useJwtDecoder(): {
  readonly input: string
  readonly setInput: (value: string) => void
  readonly decoded: JwtDecoded | null
  readonly error: string | null
  readonly expiration: ExpirationInfo | null
  readonly handleClear: () => void
} {
  const [input, setInput] = useState("")

  const debouncedInput = useDebounce(input, 300)

  const { decoded, error } = useMemo((): {
    decoded: JwtDecoded | null
    error: string | null
  } => {
    if (!debouncedInput.trim()) {
      return { decoded: null, error: null }
    }
    try {
      return { decoded: decodeJwt(debouncedInput), error: null }
    } catch (e) {
      return {
        decoded: null,
        error: e instanceof Error ? e.message : "Failed to decode JWT",
      }
    }
  }, [debouncedInput])

  const expiration = useMemo((): ExpirationInfo | null => {
    if (!decoded) return null
    const iat = decoded.payload.data.iat as number | undefined
    const exp = decoded.payload.data.exp as number | undefined
    return computeExpirationInfo(iat, exp)
  }, [decoded])

  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  return {
    input,
    setInput,
    decoded,
    error,
    expiration,
    handleClear,
  } as const
}
