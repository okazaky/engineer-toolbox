import { Braces, Binary, KeyRound } from "lucide-react"
import { type NavItem } from "@/types/common.types"

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "JSON Formatter",
    href: "/json-formatter",
    icon: Braces,
    description: "Beautify, minify & validate JSON",
  },
  {
    label: "Base64",
    href: "/base64",
    icon: Binary,
    description: "Encode & decode Base64 strings",
  },
  {
    label: "JWT Decoder",
    href: "/jwt-decoder",
    icon: KeyRound,
    description: "Decode & inspect JWT tokens",
  },
] as const

export const APP_NAME = "Engineer's Toolbox"
export const APP_DESCRIPTION = "Developer utilities for everyday tasks"
