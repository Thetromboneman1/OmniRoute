# Feature: Warp Terminal as CLI tool with MITM support

> GitHub Issue: #1015 — opened by @razllivan on 2026-04-05
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

Add Warp terminal as a recognized CLI tool with MITM proxy support.

## 💬 Community Discussion

### Participants
- @razllivan — Original requester

### Key Points
- Minimal detail provided — no specific use case or technical requirements

## 🎯 Refined Feature Description

Register Warp terminal in the CLI tool detection system so OmniRoute can auto-detect and configure it. Add MITM support for intercepting Warp's AI requests.

### What it solves
- Warp terminal users can't auto-configure OmniRoute integration

### How it should work (high level)
1. Add Warp binary detection to CLI tool scanner
2. Add Warp config file location and format
3. Add MITM DNS target for Warp's API endpoint

### Affected areas
- `src/lib/cliTools/` — add warp detection
- `src/mitm/` — add warp DNS target
- Dashboard CLI tools page

## 📎 Attachments & References
- Warp: https://www.warp.dev/

## 🔗 Related Ideas
- None — but follows existing CLI tool integration patterns
