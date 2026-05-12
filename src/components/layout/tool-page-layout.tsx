"use client"

import { type FC, type ReactNode } from "react"
import { motion } from "framer-motion"

interface ToolPageLayoutProps {
  readonly title: string
  readonly description: string
  readonly children: ReactNode
}

export const ToolPageLayout: FC<ToolPageLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-1 flex-col gap-6 p-4 md:p-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </motion.div>
  )
}
