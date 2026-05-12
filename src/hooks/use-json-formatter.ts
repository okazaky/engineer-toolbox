"use client"

import { useState, useMemo, useCallback } from "react"
import { type JsonIndent, type JsonFormatterState } from "@/types/json-formatter.types"
import { type ValidationResult } from "@/types/common.types"
import { formatJson, minifyJson } from "@/lib/json/formatter"
import { validateJson } from "@/lib/json/validator"
import { useDebounce } from "./use-debounce"

export function useJsonFormatter(): {
  readonly state: JsonFormatterState
  readonly setInput: (value: string) => void
  readonly setIndent: (indent: JsonIndent) => void
  readonly handleFormat: () => void
  readonly handleMinify: () => void
  readonly handleClear: () => void
} {
  const [input, setInput] = useState("")
  const [indent, setIndent] = useState<JsonIndent>(2)
  const [output, setOutput] = useState("")
  const [isMinified, setIsMinified] = useState(false)

  const debouncedInput = useDebounce(input, 300)

  const validation: ValidationResult = useMemo(() => {
    if (!debouncedInput.trim()) {
      return { valid: true }
    }
    return validateJson(debouncedInput)
  }, [debouncedInput])

  const handleFormat = useCallback(() => {
    if (!input.trim()) return
    try {
      const formatted = formatJson(input, indent)
      setOutput(formatted)
      setIsMinified(false)
    } catch {
      // validation will show the error
    }
  }, [input, indent])

  const handleMinify = useCallback(() => {
    if (!input.trim()) return
    try {
      const minified = minifyJson(input)
      setOutput(minified)
      setIsMinified(true)
    } catch {
      // validation will show the error
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setIsMinified(false)
  }, [])

  const state: JsonFormatterState = {
    input,
    output,
    indent,
    validation,
    isMinified,
  }

  return {
    state,
    setInput,
    setIndent,
    handleFormat,
    handleMinify,
    handleClear,
  } as const
}
