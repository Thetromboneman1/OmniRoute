# Feature: Use Codex GPT models in Claude Code CLI

> GitHub Issue: #907 — opened by @tranduykhanh030 on 2026-04-02
> Status: 📋 Cataloged | Priority: Low

## 📝 Original Request

User asks how to use GPT models in Claude Code CLI through OmniRoute, noting that OmniRoute "doesn't provide an output for Claude Code."

## 💬 Community Discussion
- No community comments

## 🎯 Refined Feature Description

This is **already a core feature** of OmniRoute. OmniRoute acts as an OpenAI-compatible proxy that Claude Code can connect to, routing requests to any configured provider including Codex/GPT models.

### What it solves
- Already solved — this is a documentation/discoverability issue

### How it works (already)
1. Configure OmniRoute with Codex/OpenAI credentials
2. Set Claude Code's `ANTHROPIC_BASE_URL` to OmniRoute's endpoint
3. Claude Code sends requests → OmniRoute routes to GPT models

### Affected areas
- Documentation improvement needed — better quickstart guide for Claude Code users

## 🔗 Related Ideas
- None — existing functionality
