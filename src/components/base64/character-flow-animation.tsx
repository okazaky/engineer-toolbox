"use client"

import { type FC, useMemo } from "react"
import { motion } from "framer-motion"

interface CharacterFlowAnimationProps {
  readonly text: string
  readonly maxChars?: number
}

export const CharacterFlowAnimation: FC<CharacterFlowAnimationProps> = ({
  text,
  maxChars = 100,
}) => {
  const displayText = useMemo(() => {
    return text.length > maxChars ? text.slice(0, maxChars) + "..." : text
  }, [text, maxChars])

  if (!text) return null

  return (
    <div className="overflow-hidden rounded-md border bg-muted/30 p-3 font-mono text-sm">
      <div className="flex flex-wrap">
        {displayText.split("").map((char, index) => (
          <motion.span
            key={`${index}-${char}`}
            initial={{ opacity: 0, filter: "blur(4px)", y: -4 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              delay: index * 0.015,
              duration: 0.2,
              ease: "easeOut",
            }}
            className="whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
