export type Base64Direction = "encode" | "decode"

export interface Base64State {
  readonly input: string
  readonly output: string
  readonly direction: Base64Direction
  readonly error: string | null
}

export interface Base64DetectionResult {
  readonly isBase64: boolean
  readonly confidence: number
}
