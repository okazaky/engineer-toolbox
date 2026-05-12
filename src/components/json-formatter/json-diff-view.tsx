"use client"

import { type FC, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { computeJsonDiff } from "@/lib/json/differ"
import { cn } from "@/lib/utils"

interface JsonDiffViewProps {
  readonly original: string
  readonly formatted: string
}

export const JsonDiffView: FC<JsonDiffViewProps> = ({
  original,
  formatted,
}) => {
  const segments = useMemo(
    () => computeJsonDiff(original, formatted),
    [original, formatted]
  )

  if (!original || !formatted) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Diff</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] rounded-md border bg-muted/30 p-3">
          <pre className="font-mono text-sm">
            <AnimatePresence>
              {segments.map((segment, index) => (
                <motion.div
                  key={`${index}-${segment.type}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={cn(
                    "whitespace-pre-wrap",
                    segment.type === "added" && "bg-green-500/10 text-green-700 dark:text-green-400",
                    segment.type === "removed" && "bg-red-500/10 text-red-700 dark:text-red-400 line-through",
                    segment.type === "unchanged" && "text-muted-foreground"
                  )}
                >
                  {segment.type === "added" && "+ "}
                  {segment.type === "removed" && "- "}
                  {segment.type === "unchanged" && "  "}
                  {segment.value}
                </motion.div>
              ))}
            </AnimatePresence>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
