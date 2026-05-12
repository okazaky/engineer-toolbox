"use client"

import { type FC } from "react"
import { type JsonIndent } from "@/types/json-formatter.types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface JsonFormatControlsProps {
  readonly indent: JsonIndent
  readonly onIndentChange: (indent: JsonIndent) => void
}

export const JsonFormatControls: FC<JsonFormatControlsProps> = ({
  indent,
  onIndentChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Indent:</span>
      <Select
        value={String(indent)}
        onValueChange={(val) => onIndentChange(Number(val) as JsonIndent)}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="8">8</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
