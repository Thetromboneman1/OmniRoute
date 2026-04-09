# Feature: Telegram Integration

> GitHub Issue: #945 — opened by @inteligenciamilgrau on 2026-04-03
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

OpenClaw integrates with Telegram but only talks to OpenClaw. Request to add Telegram integration so users can chat with all CLIs (Claude Code, Codex, Gemini CLI) through Telegram.

## 💬 Community Discussion

### Participants
- @inteligenciamilgrau — Original requester
- @oyi77 — Objected: "this shouldn't be in the router, imagine OpenRouter with Telegram integration — feels weird"
- @daniil-pogorelov — Suggested "just make a bot"

### Key Points
- Community split: some think it belongs in an orchestrator/agent layer, not a router
- Could be implemented as external bot using OmniRoute's API
- Scope creep concern for a routing proxy

## 🎯 Refined Feature Description

This is out of scope for OmniRoute's core mission as a proxy/router. Telegram integration belongs in an application/orchestrator layer that consumes OmniRoute's API, not inside OmniRoute itself.

### What it solves
- N/A — better served by external bot

### Affected areas
- N/A — recommend external implementation

## 🔗 Related Ideas
- None — this is a distinct concern from routing
