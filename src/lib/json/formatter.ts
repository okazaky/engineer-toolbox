import { type JsonIndent } from "@/types/json-formatter.types"

export function formatJson(input: string, indent: JsonIndent = 2): string {
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed, null, indent)
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed)
}
