# Feature: Smart Auto-Combos — Dynamic model composition

> GitHub Issue: #1041 — opened by @oyi77 on 2026-04-07
> Status: 📋 Cataloged | Priority: High

## 📝 Original Request

When a user first sets up OmniRoute they manually build an Auto-Combo that reflects current credentials. The combo gets stale immediately when new API keys/providers are added or better models are released.

**Proposed: "Smart Combo" mode** — combo member list is re-evaluated at routing time against all currently active credentials, rather than being a fixed array.

## 💬 Community Discussion

### Participants
- @oyi77 — Original requester (power user, contributor)
- @kilo-code-bot — Flagged similarity to #563 (91%), but author explained distinction

### Key Points
- **#563 (closed)** was about routing an incoming model pattern to a specific combo (routing layer)
- **This issue** is about the combo's own member list being dynamic (composition layer)
- Combo should auto-update when credentials/providers change
- Should respect user-configured constraints (exclude lists, priority overrides)

## 🎯 Refined Feature Description

Add a "Smart" toggle to combo creation that makes the combo's model member list dynamically computed at routing time. Instead of storing fixed model IDs, it evaluates all currently active credentials/models and selects the best options.

### What it solves
- Stale combos when new API keys are added
- Models not being used when newly synced from models.dev
- Disabled credentials still being tried

### How it should work (high level)
1. User creates combo with "Smart" toggle ON
2. Configures filters/constraints (provider whitelist/blacklist, model pattern regex, cost tier limits)
3. At request time, combo engine queries active credentials + model catalog
4. Dynamically computes the member list based on filters + scoring (LKGP, latency, cost)
5. Routes using the dynamically computed list with the selected strategy

### Affected areas
- `open-sse/services/combo.ts` — core routing engine
- `open-sse/services/autoCombo/` — auto-combo scoring
- `src/lib/db/combos.ts` — combo schema changes
- `src/shared/validation/schemas.ts` — new combo type schema
- Dashboard combo creation UI

## 📎 Attachments & References
- Discussion with @kilo-code-bot distinguishing from #563

## 🔗 Related Ideas
- Related to [980-lkgp-routing](./980-lkgp-routing.md) — LKGP could feed scoring
- Related to [785-task-class-routing](./785-task-class-routing.md) — task-aware routing
