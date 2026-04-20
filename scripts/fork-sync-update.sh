#!/bin/bash
set -euo pipefail

REPO_DIR="/Users/corn/Documents/Hermes/OmniRoute"
LOG_FILE="/tmp/omniroute-fork-sync.log"
LOCK_FILE="/tmp/omniroute-fork-sync.lock"

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

if [[ -f "$LOCK_FILE" ]]; then
  lock_pid=$(cat "$LOCK_FILE" 2>/dev/null || true)
  if [[ -n "$lock_pid" ]] && kill -0 "$lock_pid" 2>/dev/null; then
    exit 0
  fi
fi

echo $$ > "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

{
  echo "[$(date)] Checking fork updates..."

  cd "$REPO_DIR"

  if [[ -n "$(git status --porcelain)" ]]; then
    echo "[$(date)] Working tree is dirty; skipping auto-pull"
    exit 0
  fi

  git fetch origin main

  local_sha=$(git rev-parse HEAD)
  remote_sha=$(git rev-parse origin/main)

  if [[ "$local_sha" == "$remote_sha" ]]; then
    echo "[$(date)] Already up to date"
    exit 0
  fi

  if git merge-base --is-ancestor HEAD origin/main; then
    git pull --ff-only origin main
    echo "[$(date)] Pulled latest fork changes"
  else
    echo "[$(date)] Local branch diverged from origin/main; skipping auto-pull"
  fi
} >> "$LOG_FILE" 2>&1
