"use client"

import { type FC } from "react"
import { ArrowRightLeft } from "lucide-react"
import { motion } from "framer-motion"
import { type Base64Direction } from "@/types/base64.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Base64DirectionToggleProps {
  readonly direction: Base64Direction
  readonly onToggle: () => void
  readonly isAutoDetected: boolean
}

export const Base64DirectionToggle: FC<Base64DirectionToggleProps> = ({
  direction,
  onToggle,
  isAutoDetected,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={onToggle}>
        <motion.div
          animate={{ rotate: direction === "decode" ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowRightLeft className="mr-1.5 size-4" />
        </motion.div>
        {direction === "encode" ? "Encode" : "Decode"}
      </Button>
      {isAutoDetected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Badge variant="secondary" className="text-xs">
            Auto-detected
          </Badge>
        </motion.div>
      )}
    </div>
  )
}
