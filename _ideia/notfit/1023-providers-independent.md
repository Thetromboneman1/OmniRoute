# Feature: Providers-independent approach (Universal Model IDs)

> GitHub Issue: #1023 — opened by @ralphilius on 2026-04-06
> Status: 📋 Cataloged | Priority: Medium

## 📝 Original Request

When connecting to multiple providers that serve the same models, users need to switch prefixes in coding tool configs. Proposes universal constant model IDs that work regardless of provider, making OmniRoute appear as a single provider.

## 💬 Community Discussion

### Participants
- @ralphilius — Original requester

### Key Points
- Pain point: switching provider prefixes in client configs when rotating providers
- Wants "set and forget" configuration

## 🎯 Refined Feature Description

This is essentially the model alias system that already exists. Users can create aliases like `claude-sonnet` → `anthropic/claude-sonnet-4` so their clients always use the same model name regardless of which provider serves it.

### What it solves
- Already solved by existing Model Aliases feature (`/dashboard/settings` → Model Aliases)

### Affected areas
- May need better documentation/discoverability of existing aliases feature

## 📎 Attachments & References
- Existing feature: Model Aliases in dashboard settings

## 🔗 Related Ideas
- This overlaps with existing Model Aliases functionality — may just need documentation/UI improvements
