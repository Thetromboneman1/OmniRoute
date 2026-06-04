# TAP Lite

## Executive Summary
Unified OpenAI-compatible AI proxy/router with multi-provider routing and protocol tooling.

## Business Purpose
Deliver reliable and maintainable functionality for the workspace AI platform and associated operations.

## Architecture Overview
- Next.js API routes
- open-sse runtime translation/execution
- MCP and A2A protocol services
- SQLite-backed policy and metrics

## Data Flow
~~~mermaid
flowchart TD
  A[Trigger] --> B[OmniRoute Service Layer]
  B --> C[State and Config]
  B --> D[Execution]
  D --> E[Observability and Validation]
~~~

## Dependencies
- Runtime and platform dependencies documented in repository README.
- Local environment and endpoint configuration in user-managed config files.

## AI Integration Strategy
Primary routing layer for model/provider abstraction, policies, and failover.

## Security Considerations
- Principle of least privilege for background services and automation.
- Protect credentials in local env files and secret stores.
- Validate external endpoint reachability and authentication.

## Operational Considerations
- Include health checks for core commands/services.
- Keep rollback-first workflow for system and service changes.
- Prefer non-destructive cleanup unless explicitly approved.

## Risks
Complex multi-provider routing can mask endpoint drift without explicit health probes.

## Roadmap
- Continue benchmark-driven tuning.
- Improve service consolidation and endpoint standardization.
- Track production-readiness metrics in catalog reports.
