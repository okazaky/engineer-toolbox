"use client"

import { type FC } from "react"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ErrorDisplayProps {
  readonly message: string
  readonly line?: number
  readonly column?: number
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({
  message,
  line,
  column,
}) => {
  const location =
    line !== undefined
      ? column !== undefined
        ? ` (line ${line}, column ${column})`
        : ` (line ${line})`
      : ""

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertDescription>
          {message}
          {location}
        </AlertDescription>
      </Alert>
    </motion.div>
  )
}
