"use client"

import { useState, useCallback, useMemo } from "react"
import { type Base64Direction, type Base64State } from "@/types/base64.types"
import { encodeBase64, decodeBase64 } from "@/lib/base64/codec"
import { detectBase64 } from "@/lib/base64/detector"
import { useDebounce } from "./use-debounce"

export function useBase64(): {
  readonly state: Base64State
  readonly setInput: (value: string) => void
  readonly setDirection: (direction: Base64Direction) => void
  readonly toggleDirection: () => void
  readonly handleClear: () => void
  readonly isAutoDetected: boolean
} {
  const [input, setInput] = useState("")
  const [direction, setDirection] = useState<Base64Direction>("encode")
  const [isAutoDetected, setIsAutoDetected] = useState(false)

  const debouncedInput = useDebounce(input, 200)

  const processed = useMemo((): Pick<Base64State, "output" | "error"> => {
    if (!debouncedInput.trim()) {
      return { output: "", error: null }
    }

    try {
      if (direction === "encode") {
        return { output: encodeBase64(debouncedInput), error: null }
      }

      return { output: decodeBase64(debouncedInput), error: null }
    } catch {
      return {
        output: "",
        error: direction === "decode"
          ? "Invalid Base64 input"
          : "Encoding failed",
      }
    }
  }, [debouncedInput, direction])

  const handleSetInput = useCallback((value: string) => {
    setInput(value)
    const detection = detectBase64(value)
    if (detection.isBase64 && detection.confidence >= 0.8) {
      setDirection("decode")
      setIsAutoDetected(true)
    } else {
      setIsAutoDetected(false)
    }
  }, [])

  const toggleDirection = useCallback(() => {
    setDirection((prev) => (prev === "encode" ? "decode" : "encode"))
    setIsAutoDetected(false)
  }, [])

  const handleClear = useCallback(() => {
    setInput("")
    setIsAutoDetected(false)
  }, [])

  const state: Base64State = {
    input,
    output: processed.output,
    direction,
    error: processed.error,
  }

  return {
    state,
    setInput: handleSetInput,
    setDirection,
    toggleDirection,
    handleClear,
    isAutoDetected,
  } as const
}
