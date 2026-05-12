"use client"

import { type FC, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface AnimatedOutputProps {
  readonly children: ReactNode
  readonly animationKey: string
}

export const AnimatedOutput: FC<AnimatedOutputProps> = ({
  children,
  animationKey,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
