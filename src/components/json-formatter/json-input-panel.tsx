"use client"

import { type FC } from "react"
import { type ValidationResult } from "@/types/common.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeEditor } from "@/components/shared/code-editor"
import { JsonErrorIndicator } from "./json-error-indicator"

interface JsonInputPanelProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly validation: ValidationResult
}

export const JsonInputPanel: FC<JsonInputPanelProps> = ({
  value,
  onChange,
  validation,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CodeEditor
          value={value}
          onChange={onChange}
          placeholder='Paste your JSON here... e.g. {"key": "value"}'
          className="min-h-[300px]"
        />
        <JsonErrorIndicator validation={validation} />
      </CardContent>
    </Card>
  )
}
