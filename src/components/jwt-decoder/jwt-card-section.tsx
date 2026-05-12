"use client"

import { type FC, useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/shared/copy-button"
import { cn } from "@/lib/utils"
import { JwtSectionList } from "./jwt-section-list"

const COLOR_SCHEMES = {
  blue: {
    border: "border-l-4 border-l-blue-500",
    title: "text-blue-600 dark:text-blue-400",
  },
  purple: {
    border: "border-l-4 border-l-purple-500",
    title: "text-purple-600 dark:text-purple-400",
  },
  orange: {
    border: "border-l-4 border-l-orange-500",
    title: "text-orange-600 dark:text-orange-400",
  },
} as const

interface JwtCardSectionProps {
  readonly title: string
  readonly data: Record<string, unknown>
  readonly section: "header" | "payload" | "signature"
  readonly colorScheme: "blue" | "purple" | "orange"
  readonly defaultOpen?: boolean
}

export const JwtCardSection: FC<JwtCardSectionProps> = ({
  title,
  data,
  section,
  colorScheme,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const colors = COLOR_SCHEMES[colorScheme]
  const isSignature = section === "signature"
  const copyText = isSignature
    ? (data.raw as string) ?? ""
    : JSON.stringify(data, null, 2)

  return (
    <Card className={cn(colors.border)}>
      <CardHeader
        className="flex cursor-pointer flex-row items-center justify-between pb-3"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-4 text-muted-foreground" />
          </motion.div>
          <CardTitle className={cn("text-base", colors.title)}>
            {title}
          </CardTitle>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <CopyButton text={copyText} />
        </div>
      </CardHeader>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0">
              {isSignature ? (
                <div className="rounded-md border bg-muted/30 px-3 py-2">
                  <span className="break-all font-mono text-xs text-muted-foreground">
                    {data.raw as string}
                  </span>
                </div>
              ) : (
                <JwtSectionList
                  data={data}
                  section={section as "header" | "payload"}
                />
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
