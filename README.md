# Engineer Toolbox

A privacy-first web toolbox for everyday engineering tasks. It runs entirely in
the browser and does not send pasted payloads, tokens, or JSON documents to a
server.

## Tools

- JSON Formatter: validate, format, minify, and compare JSON payloads.
- Base64 Utility: encode, decode, and detect Base64-like input.
- JWT Decoder: inspect JWT header, payload, signature, and expiration metadata.

## Why This Exists

Engineers often need quick inspection tools while debugging APIs. Many online
utilities require pasting sensitive payloads into third-party services. This app
keeps the workflow local to the browser and avoids external API calls.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Zod validation at parsing boundaries
- shadcn/ui-style component primitives
- Static export support for simple hosting

## Project Structure

```text
src/app/                 Route-level pages
src/components/          Feature and shared UI components
src/hooks/               Client-side state hooks
src/lib/                 Pure parsing and formatting functions
src/schemas/             Zod validation schemas
src/types/               Shared TypeScript interfaces
docs/                    Architecture and privacy notes
```

## Local Development

```bash
pnpm install
pnpm lint
pnpm build
pnpm dev
```

Open `http://localhost:3000`.

## Static Export

The app is configured for static export. To build for a subpath, set
`NEXT_PUBLIC_BASE_PATH`.

```bash
NEXT_PUBLIC_BASE_PATH=/engineer-toolbox pnpm build
```

The generated site is written to `out/`.

## Privacy

- No backend API is used by the tools.
- No analytics, tracking SDK, or remote logging is included.
- User input is held only in browser state.
- `.env*`, build output, and local artifacts are excluded from Git.

## Documentation

- [Architecture](docs/architecture.md)
- [Privacy and Risk Review](docs/privacy.md)
- [Completion Risk Review](RISK_REVIEW.md)
