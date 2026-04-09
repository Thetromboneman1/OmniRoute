# Feature: Mask email addresses in Dashboard and Logs

> GitHub Issue: #1025 — opened by @inteligenciamilgrau on 2026-04-06
> Status: 📋 Cataloged | Priority: Medium

## 📝 Original Request

Email addresses appear fully unmasked in Dashboards and Logs (Providers page, HealthCheck logs), exposing personal info vulnerable to social engineering.

### Proposed Solution
Mask email: show first and last letter, cover the rest (e.g., `d****w@g****.com`).

### Alternatives Considered
- Visible/invisible toggle button for dashboard (not viable for logs)
- Avoid exhibiting email info entirely

## 💬 Community Discussion

### Participants
- @inteligenciamilgrau — Original requester

### Key Points
- Affects Provider detail page (connections level) and HealthCheck logs
- Privacy/security concern for shared dashboards

## 🎯 Refined Feature Description

Implement email masking utility that replaces the middle characters of email addresses with asterisks. Apply it to all dashboard components that display OAuth emails and log entries.

### What it solves
- Privacy leak of full email addresses on shared screens
- Social engineering attack surface

### How it should work (high level)
1. Create a `maskEmail(email: string)` utility function
2. Apply to all dashboard components showing OAuth connection emails
3. Apply to log display components
4. Optionally add a "reveal" button (click to show full email momentarily)

### Affected areas
- `src/shared/utils/` — new `maskEmail` utility
- Provider detail pages — connection email display
- Log viewer components
- i18n — minimal (maybe "reveal" button text)

## 🔗 Related Ideas
- None
