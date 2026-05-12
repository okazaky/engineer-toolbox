"use client"

import { type FC } from "react"
import { AnimatePresence } from "framer-motion"
import { type ValidationResult } from "@/types/common.types"
import { ErrorDisplay } from "@/components/shared/error-display"

interface JsonErrorIndicatorProps {
  readonly validation: ValidationResult
}

export const JsonErrorIndicator: FC<JsonErrorIndicatorProps> = ({
  validation,
}) => {
  return (
    <AnimatePresence>
      {!validation.valid && validation.error && (
        <ErrorDisplay
          message={validation.error}
          line={validation.line}
          column={validation.column}
        />
      )}
    </AnimatePresence>
  )
}
