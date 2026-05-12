"use client"

import { type FC } from "react"
import { type ToolAction } from "@/types/common.types"
import { Button } from "@/components/ui/button"

interface ActionToolbarProps {
  readonly actions: readonly ToolAction[]
}

export const ActionToolbar: FC<ActionToolbarProps> = ({ actions }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          size="sm"
          onClick={action.onClick}
          disabled={action.disabled}
        >
          <action.icon className="mr-1.5 size-4" />
          {action.label}
        </Button>
      ))}
    </div>
  )
}
