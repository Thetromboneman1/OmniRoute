# OmniRoute

Single endpoint AI router and gateway for multi-provider LLM workloads.

## What OmniRoute Does

- Routes requests across 100+ providers.
- Supports chat, embeddings, images, audio, video, rerank, and search.
- Provides MCP server tooling and A2A protocol support.
- Includes dashboard + API in one service.

## Local Quick Start

```bash
npm install
npm run dev
```

Default local endpoint: `http://localhost:20128/v1`

## Core Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck:core
npm run test:coverage
npm run check
```

## Architecture At A Glance

- `src/app/api/v1/`: API route entrypoints.
- `open-sse/`: request handlers, executors, translators, services.
- `src/lib/db/`: SQLite domain modules and migrations.
- `open-sse/mcp-server/`: MCP tools and transports.
- `src/lib/a2a/`: A2A task and skills layer.

## CI/CD Notes (Local Fork)

This fork is configured to be resilient in environments without all external secrets:

- Docker publish workflow handles missing Docker Hub credentials gracefully.
- CI advanced security job skips Snyk scan when `SNYK_TOKEN` is not configured.

## Docs

- `AGENTS.md`
- `CLAUDE.md`
- `CONTRIBUTING.md`
- `docs/`

## License

MIT. See `LICENSE`.
