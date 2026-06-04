# Architecture

## Purpose
Unified OpenAI-compatible AI proxy/router with multi-provider routing and protocol tooling.

## Core Components
- Next.js API routes
- open-sse runtime translation/execution
- MCP and A2A protocol services
- SQLite-backed policy and metrics

## Data Flow
~~~mermaid
flowchart LR
  Input[User or Automation Trigger] --> Logic[OmniRoute Logic]
  Logic --> State[Local Config or Runtime State]
  Logic --> Output[System Action or API Result]
  State --> Output
~~~
