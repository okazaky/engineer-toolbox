import { type JsonDiffSegment } from "@/types/json-formatter.types"

export function computeJsonDiff(
  original: string,
  formatted: string
): readonly JsonDiffSegment[] {
  const originalLines = original.split("\n")
  const formattedLines = formatted.split("\n")
  const segments: JsonDiffSegment[] = []

  const maxLen = Math.max(originalLines.length, formattedLines.length)

  for (let i = 0; i < maxLen; i++) {
    const origLine = originalLines[i]
    const fmtLine = formattedLines[i]

    if (origLine === undefined) {
      segments.push({ type: "added", value: fmtLine ?? "" })
    } else if (fmtLine === undefined) {
      segments.push({ type: "removed", value: origLine })
    } else if (origLine === fmtLine) {
      segments.push({ type: "unchanged", value: origLine })
    } else {
      segments.push({ type: "removed", value: origLine })
      segments.push({ type: "added", value: fmtLine })
    }
  }

  return segments
}
