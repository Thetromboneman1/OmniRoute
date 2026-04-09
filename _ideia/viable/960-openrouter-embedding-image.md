# Feature: OpenRouter Embedding and Image Models

> GitHub Issue: #960 — opened by @keith8496 on 2026-04-03
> Status: 📋 Cataloged | Priority: Medium

## 📝 Original Request

Adding custom embedding models via UI doesn't work for OpenRouter. Returns "Unknown embedding provider: openrouter". User had to manually edit `embeddingRegistry.ts` and rebuild Docker container.

User offers to submit a PR: https://github.com/keith8496/OmniRoute/blob/main/open-sse/config/embeddingRegistry.ts

## 💬 Community Discussion

### Participants
- @keith8496 — Original requester (has working fork)

### Key Points
- Adding embedding models via UI fails
- Manual edit of `embeddingRegistry.ts` works but requires container rebuild
- User has a working fork ready for PR

## 🎯 Refined Feature Description

Add OpenRouter (and GitHub Copilot) to the embedding provider registry so their embedding models can be used through the standard UI flow, without requiring source code changes.

### What it solves
- OpenRouter embedding models can't be added via UI
- Requires container rebuild for something that should be configurable

### How it should work
1. Add `openrouter` to `embeddingRegistry.ts` with correct base URL and model patterns
2. Allow dynamic embedding model registration through the UI
3. Similarly add image generation model support for OpenRouter

### Affected areas
- `open-sse/config/embeddingRegistry.ts` — add openrouter+github entries
- `open-sse/handlers/embeddings.ts` — ensure dynamic provider resolution
- Dashboard UI — embedding model management

## 📎 Attachments & References
- User's fork: https://github.com/keith8496/OmniRoute/blob/main/open-sse/config/embeddingRegistry.ts

## 🔗 Related Ideas
- Related to [973-custom-provider-image-gen](./973-custom-provider-image-gen.md)
