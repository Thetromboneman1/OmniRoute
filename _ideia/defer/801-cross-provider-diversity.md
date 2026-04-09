# Feature: Cross-Provider Cognitive Diversity (Role-to-Provider Mapping)

> GitHub Issue: #801 — opened by @igormorais123 on 2026-03-30
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

Enforce that different roles in multi-model review pipelines use different providers to maximize failure diversity. A planner and its critic should never be the same provider.

## 🎯 Refined Feature Description

This is an advanced orchestration pattern. OmniRoute already supports multi-provider combos but doesn't enforce cognitive diversity between roles. This would require significant architectural changes to add role-based routing.

### Affected areas
- Would require a new orchestration layer above combo routing
- Significant scope for a routing proxy

## 🔗 Related Ideas
- Related to [792-team-of-rivals](./792-team-of-rivals.md)
- Related to [797-hierarchical-router](./797-hierarchical-router.md)
- Part of @igormorais123's 5-issue series (#785, #787, #792, #797, #801)
