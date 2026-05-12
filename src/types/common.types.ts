import { type LucideIcon } from "lucide-react"

export interface NavItem {
  readonly label: string
  readonly href: string
  readonly icon: LucideIcon
  readonly description: string
}

export interface ValidationResult {
  readonly valid: boolean
  readonly error?: string
  readonly line?: number
  readonly column?: number
}

export interface ToolAction {
  readonly label: string
  readonly icon: LucideIcon
  readonly onClick: () => void
  readonly disabled?: boolean
}
