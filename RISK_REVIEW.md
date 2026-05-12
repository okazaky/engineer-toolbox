# Risk Review

## Scope

Public GitHub release of Engineer Toolbox as a static, browser-only engineering
utility.

- release_blocker: no

## Security and Abuse Risk

- No backend API, database, server session, webhook, or credential exchange is
  included.
- User-provided JSON, Base64 text, and JWT strings are processed in browser
  state only.
- JWT decoding is explicitly inspection-only and does not verify trust.
- No analytics or remote logging package is included.
- `.env*`, generated output, local artifacts, and dependency folders are ignored.

## Structural Risk

- Static export avoids server runtime single points of failure.
- Tool logic is split into pure functions, hooks, schemas, and components.
- No background jobs, queues, schedulers, or retry loops are present.
- The public repository is initialized from a fresh Git history to avoid leaking
  local development history.

## API Consumption Risk

- Expected external API calls: zero.
- Worst-case call amplification: none, because the app has no outbound API
  integration.
- Cost impact: none beyond static hosting bandwidth.

## Multi-call Amplification Checks

- No fan-out loops to remote services.
- No polling loops.
- No duplicate-trigger background workers.
- No scraping or automated request generation.

## Operational Controls

- Run `pnpm lint` before release.
- Run `pnpm build` before release.
- Run secret and PII scans before pushing.
- Keep GitHub branch protection or required checks enabled if the repository is
  used for continued public development.

## Residual Risks

- Low: Users may paste real JWTs into their own browser while screen sharing.
  Mitigation: no remote transmission exists; documentation labels the tool as
  local inspection only. Next action: add UI copy if broader non-engineer usage
  is expected.
- Low: Browser extensions installed by the user could observe page input.
  Mitigation: this is outside the app boundary; recommend trusted browser
  profiles for sensitive debugging.
