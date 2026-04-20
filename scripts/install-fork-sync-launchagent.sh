#!/bin/bash
set -euo pipefail

PLIST_LABEL="local.omniroute.fork-sync"
PLIST_SOURCE="/Users/corn/Documents/Hermes/OmniRoute/local.omniroute.fork-sync.plist"
PLIST_TARGET="$HOME/Library/LaunchAgents/$PLIST_LABEL.plist"
UID_VALUE=$(id -u)

mkdir -p "$HOME/Library/LaunchAgents"
cp "$PLIST_SOURCE" "$PLIST_TARGET"

launchctl bootout "gui/$UID_VALUE/$PLIST_LABEL" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$UID_VALUE" "$PLIST_TARGET"
launchctl enable "gui/$UID_VALUE/$PLIST_LABEL"
launchctl kickstart -k "gui/$UID_VALUE/$PLIST_LABEL"

echo "Installed $PLIST_LABEL"
echo "Log file: /tmp/omniroute-fork-sync.log"
