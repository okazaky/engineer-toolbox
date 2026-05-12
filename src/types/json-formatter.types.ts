import { type ValidationResult } from "./common.types"

export type JsonIndent = 2 | 4 | 8

export interface JsonFormatterState {
  readonly input: string
  readonly output: string
  readonly indent: JsonIndent
  readonly validation: ValidationResult
  readonly isMinified: boolean
}

export interface JsonDiffSegment {
  readonly type: "added" | "removed" | "unchanged"
  readonly value: string
}
