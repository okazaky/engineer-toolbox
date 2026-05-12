"use client"

import { type FC } from "react"
import { Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useClipboard } from "@/hooks/use-clipboard"
import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  readonly text: string
  readonly className?: string
}

export const CopyButton: FC<CopyButtonProps> = ({ text, className }) => {
  const { copy, copied } = useClipboard()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => copy(text)}
      disabled={!text}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="size-4 text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className="size-4" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
    </Button>
  )
}
