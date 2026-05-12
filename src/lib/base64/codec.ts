export function encodeBase64(input: string): string {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(input)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("")
  return btoa(binary)
}

export function decodeBase64(input: string): string {
  const binary = atob(input)
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
  const decoder = new TextDecoder()
  return decoder.decode(bytes)
}
