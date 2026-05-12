"use client"

import { type FC } from "react"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { type JwtFieldMeta } from "@/types/jwt-decoder.types"

interface JwtFieldTooltipProps {
  readonly field: JwtFieldMeta
}

export const JwtFieldTooltip: FC<JwtFieldTooltipProps> = ({ field }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Info className="size-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-xs">{field.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
