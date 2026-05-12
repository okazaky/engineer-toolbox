"use client"

import { type FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeEditor } from "@/components/shared/code-editor"

interface Base64InputPanelProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly direction: "encode" | "decode"
}

export const Base64InputPanel: FC<Base64InputPanelProps> = ({
  value,
  onChange,
  direction,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          {direction === "encode" ? "Text Input" : "Base64 Input"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CodeEditor
          value={value}
          onChange={onChange}
          placeholder={
            direction === "encode"
              ? "Enter text to encode..."
              : "Enter Base64 string to decode..."
          }
          className="min-h-[200px]"
        />
      </CardContent>
    </Card>
  )
}
