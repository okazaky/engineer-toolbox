# Architecture

Engineer Toolbox is a static Next.js app. Tool pages are client components
because each feature works on user-provided local text and should not send data
to a server.

## Input

- JSON text pasted into the JSON Formatter.
- Text or Base64 payloads pasted into the Base64 Utility.
- JWT strings pasted into the JWT Decoder.

## Output

- Formatted or minified JSON.
- Base64 encoded or decoded text.
- Decoded JWT sections and expiration metadata.
- Client-side validation errors with non-sensitive messages.

## Flow

1. A route in `src/app` renders the selected tool shell.
2. The page delegates state changes to a feature hook in `src/hooks`.
3. Hooks call pure functions in `src/lib`.
4. Zod schemas in `src/schemas` validate input boundaries.
5. Components render output without persisting data remotely.

## Key Modules

- `src/lib/json/formatter.ts`: JSON formatting and minification.
- `src/lib/json/validator.ts`: JSON parse validation.
- `src/lib/json/differ.ts`: structural diff segment generation.
- `src/lib/base64/codec.ts`: Base64 encode and decode logic.
- `src/lib/base64/detector.ts`: Base64 input detection.
- `src/lib/jwt/decoder.ts`: JWT section decoding.
- `src/lib/jwt/expiration.ts`: expiration status calculation.

## Operational Model

The production build is a static export. Hosting does not need a database,
server runtime, background job, queue, or API key.
