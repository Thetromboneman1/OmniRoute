# Feature: LKGP (Last Known Good Providers) Routing

> GitHub Issue: #980 — opened by @diegosouzapw on 2026-04-04
> Status: 📋 Cataloged | Priority: Medium
> Source: Discussion 919 by @oyi77

## 📝 Original Request

Implement a dynamic weighting algorithm in the combo routing engine that uses latency and recent success rate (LKGP) alongside healthchecks.

## 💬 Community Discussion

### Participants
- @diegosouzapw — Issue creator
- @oyi77 — Original discussion author

## 🎯 Refined Feature Description

LKGP routing tracks which provider connections have been performing well recently (low latency, high success rate) and dynamically adjusts routing weights to prefer them. Unlike static priority, this adapts in real-time.

### What it solves
- Static priority can't adapt to transient provider degradation
- Healthchecks are periodic — LKGP uses real request metrics

### How it should work
1. Track last N request outcomes per connection (success/fail, latency)
2. Compute a LKGP score = f(success_rate, avg_latency, recency)
3. Use LKGP scores as dynamic weights in combo routing
4. Decay old metrics over time

### Affected areas
- `open-sse/services/combo.ts` — routing weight calculation
- `src/lib/db/domainState.ts` — LKGP metric storage
- Dashboard — LKGP score visualization

## 🔗 Related Ideas
- Related to [1041-smart-auto-combos](./1041-smart-auto-combos.md)
- Related to [785-task-class-routing](./785-task-class-routing.md)
