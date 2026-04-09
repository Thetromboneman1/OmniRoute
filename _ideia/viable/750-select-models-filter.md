# Feature: Select/Filter models to list on Providers page

> GitHub Issue: #750 — opened by @inteligenciamilgrau on 2026-03-29
> Status: 📋 Cataloged | Priority: High

## 📝 Original Request

When importing models (e.g., from OpenRouter API), the list exceeds 300 models, making it hard to find what's needed. Requests a checkbox system to activate/deactivate individual models and a "select/unselect all" toggle.

## 💬 Community Discussion

### Participants
- @inteligenciamilgrau — Original requester

### Key Points
- 300+ models make the list unmanageable
- Wants to keep all models in DB but only show active ones
- "Select/unselect all" for bulk operations

## 🎯 Refined Feature Description

Add model activation/deactivation UI to the provider models list, allowing users to control which models are visible and available for routing without deleting them.

### What it solves
- Overwhelming model lists (300+ from OpenRouter)
- No way to temporarily hide models without deleting them
- Bulk operations needed for large model catalogs

### How it should work
1. Each model row gets an enable/disable toggle
2. "Select All / Deselect All" button at top
3. Search/filter bar to find models quickly
4. Disabled models don't appear in combo model selection or /v1/models
5. Models remain in DB for easy re-activation

### Affected areas
- Provider detail page — model list UI
- `src/lib/db/models.ts` — `isActive` field on models
- `src/app/api/v1/models/` route — filter inactive models
- Database migration — add `is_active` column to models table

## 🔗 Related Ideas
- None — standalone UI improvement
