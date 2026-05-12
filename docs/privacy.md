# Privacy Notes

Engineer Toolbox is designed for local browser processing.

## Data Handling

- Inputs are stored in React state only.
- The app does not define API routes.
- The app does not include analytics or remote logging.
- Build-time environment variables are limited to public static hosting config.

## Sensitive Input Guidance

The JWT Decoder is for inspection only. It does not verify signatures and should
not be used as an authorization decision engine.

## Repository Hygiene

- `.env*` files are ignored.
- Generated output is ignored.
- Public examples use placeholder values only.
- The repository was published from a fresh Git history to avoid exposing local
  development history.
