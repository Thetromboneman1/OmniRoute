# Feature: Task-Class Routing with Escalation/De-escalation

> GitHub Issue: #785 — opened by @igormorais123 on 2026-03-30
> Status: 📋 Cataloged | Priority: Medium

## 📝 Original Request

Map incoming requests to specialized combos based on 7 task classes (bulk_low_risk, code_generation, security_critical, etc.) with automatic escalation to premium models for complex tasks and de-escalation to economy for simple ones.

## 🎯 Refined Feature Description

OmniRoute already has `taskAwareRouter.ts` and `intentClassifier.ts` that provide basic task-aware routing. This request expands that with a formal escalation/de-escalation engine based on task classification.

### What it solves
- Same combo used for trivial and critical tasks
- No automatic quality scaling based on difficulty

### How it should work
1. Classify incoming request into a task class (using existing `intentClassifier`)
2. Map task class → combo selection rules (which combo, which strategy)
3. Apply escalation rules (complex request → premium model)
4. Apply de-escalation (trivial → cheap model)

### Affected areas
- `open-sse/services/taskAwareRouter.ts` — extend classification
- `open-sse/services/intentClassifier.ts` — more task classes
- `open-sse/services/combo.ts` — task-class routing integration
- Settings UI — task-class configuration

## 🔗 Related Ideas
- Related to [980-lkgp-routing](./980-lkgp-routing.md) — LKGP scoring
- Related to [1041-smart-auto-combos](./1041-smart-auto-combos.md) — dynamic combos
- Part of @igormorais123's series
