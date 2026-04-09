# Feature: Hierarchical Router — Direct vs Multi-Agent orchestration

> GitHub Issue: #797 — opened by @igormorais123 on 2026-03-30
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

Two-tier routing layer classifying requests into fast direct path (single model) or multi-agent orchestration (planner → critic → executor).

## 🎯 Refined Feature Description

This is an advanced orchestration concept that goes well beyond OmniRoute's scope as a proxy/router. OmniRoute already has `taskAwareRouter.ts` and `intentClassifier.ts` which provide basic task-aware routing, but full multi-agent orchestration is an application-layer concern.

## 🔗 Related Ideas
- Part of @igormorais123's series: [792](./792-team-of-rivals.md), [801](./801-cross-provider-diversity.md), [785](./785-task-class-routing.md), [787](./787-auto-research.md)
