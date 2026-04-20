#!/bin/bash
set -euo pipefail

PLIST_LABEL="local.omniroute.fork-sync"
PLIST_SOURCE="/Users/corn/Documents/Hermes/OmniRoute/local.omniroute.fork-sync.plist"
PLIST_TARGET="/Library/LaunchDaemons/$PLIST_LABEL.plist"

if [[ "$EUID" -ne 0 ]]; then
	echo "This installer must run as root. Re-run with: sudo $0"
	exit 1
fi

cp "$PLIST_SOURCE" "$PLIST_TARGET"
chown root:wheel "$PLIST_TARGET"
chmod 644 "$PLIST_TARGET"

launchctl bootout "system/$PLIST_LABEL" >/dev/null 2>&1 || true
launchctl bootstrap system "$PLIST_TARGET"
launchctl enable "system/$PLIST_LABEL"
launchctl kickstart -k "system/$PLIST_LABEL"

echo "Installed $PLIST_LABEL"
echo "Log file: /tmp/omniroute-fork-sync.log"
