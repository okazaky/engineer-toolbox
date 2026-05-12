"use client"

import { type FC } from "react"
import { motion } from "framer-motion"
import { getFieldDescription } from "@/lib/jwt/field-descriptions"
import { JwtFieldTooltip } from "./jwt-field-tooltip"

interface JwtSectionListProps {
  readonly data: Record<string, unknown>
  readonly section: "header" | "payload"
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
}

function formatValue(value: unknown): string {
  if (typeof value === "number") {
    if (value > 1_000_000_000 && value < 10_000_000_000) {
      return `${value} (${new Date(value * 1000).toLocaleString()})`
    }
    return String(value)
  }
  if (typeof value === "string") return value
  return JSON.stringify(value, null, 2)
}

export const JwtSectionList: FC<JwtSectionListProps> = ({ data, section }) => {
  const entries = Object.entries(data)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-2"
    >
      {entries.map(([key, value]) => {
        const fieldDesc = getFieldDescription(key, section)
        return (
          <motion.div
            key={key}
            variants={item}
            className="flex items-start gap-2 rounded-md border bg-muted/30 px-3 py-2"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm font-medium text-primary">
                  {key}
                </span>
                {fieldDesc && <JwtFieldTooltip field={fieldDesc} />}
              </div>
              <span className="break-all font-mono text-xs text-muted-foreground">
                {formatValue(value)}
              </span>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
