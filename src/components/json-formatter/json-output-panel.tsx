"use client"

import { type FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeEditor } from "@/components/shared/code-editor"
import { CopyButton } from "@/components/shared/copy-button"
import { AnimatedOutput } from "@/components/shared/animated-output"

interface JsonOutputPanelProps {
  readonly value: string
}

export const JsonOutputPanel: FC<JsonOutputPanelProps> = ({ value }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Output</CardTitle>
        {value && <CopyButton text={value} />}
      </CardHeader>
      <CardContent>
        <AnimatedOutput animationKey={value}>
          <CodeEditor
            value={value}
            onChange={() => {}}
            readOnly
            placeholder="Formatted output will appear here..."
            className="min-h-[300px]"
          />
        </AnimatedOutput>
      </CardContent>
    </Card>
  )
}
