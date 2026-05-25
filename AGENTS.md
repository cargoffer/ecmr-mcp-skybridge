# AGENTS.md - Cargoffer eCMR MCP Rules

## Code Style

Follow the patterns from the original ecmr-mcp repository at `/home/admin/code/cargoffer/ecmr-mcp`.

## Important Notes

- Use ES modules with explicit `.js` extensions
- 2-space indentation
- Semicolons required
- Copy tool patterns from `src/tools.js` in the original repo

## Architecture

- Server entry: `app/server/index.js`
- Client config: `app/client/index.js`

## Development

```bash
pnpm dev
```

## Testing

Test tools against actual ECMR API at `https://api.cargoffer.com/v1/ecmr`