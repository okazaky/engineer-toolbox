"use client"

import { type FC } from "react"
import { AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/shared/copy-button"
import { ErrorDisplay } from "@/components/shared/error-display"
import { CharacterFlowAnimation } from "./character-flow-animation"

interface Base64OutputPanelProps {
  readonly value: string
  readonly error: string | null
  readonly direction: "encode" | "decode"
}

export const Base64OutputPanel: FC<Base64OutputPanelProps> = ({
  value,
  error,
  direction,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">
          {direction === "encode" ? "Base64 Output" : "Decoded Text"}
        </CardTitle>
        {value && <CopyButton text={value} />}
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {error ? (
            <ErrorDisplay message={error} />
          ) : (
            <CharacterFlowAnimation text={value} />
          )}
        </AnimatePresence>
        {!value && !error && (
          <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
            Output will appear here...
          </div>
        )}
      </CardContent>
    </Card>
  )
}
