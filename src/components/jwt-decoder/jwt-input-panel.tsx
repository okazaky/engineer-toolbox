"use client"

import { type FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeEditor } from "@/components/shared/code-editor"

interface JwtInputPanelProps {
  readonly value: string
  readonly onChange: (value: string) => void
}

export const JwtInputPanel: FC<JwtInputPanelProps> = ({ value, onChange }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">JWT Token</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeEditor
          value={value}
          onChange={onChange}
          placeholder="Paste your JWT token here... e.g. eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.xxx"
          className="min-h-[120px]"
        />
      </CardContent>
    </Card>
  )
}
