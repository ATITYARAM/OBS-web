#!/usr/bin/env bash

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
TOOLS="$ROOT/tools"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Classroom Runtime Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

mkdir -p "$TOOLS/bin"
mkdir -p "$TOOLS/apps"
mkdir -p "$TOOLS/cache"
mkdir -p "$TOOLS/downloads"
mkdir -p "$TOOLS/logs"
mkdir -p "$TOOLS/runtime"
mkdir -p "$TOOLS/tmp"

link_tool() {

    NAME="$1"
    TARGET="$2"

    echo "Checking $NAME..."

    if [ -e "$TARGET" ]; then

        ln -sf "$TARGET" "$TOOLS/bin/$NAME"

        echo "✓ Linked -> $TARGET"

    else

        echo "✗ Not Found"

    fi

    echo

}

link_tool node "$(which node 2>/dev/null)"
link_tool npm "$(which npm 2>/dev/null)"
link_tool firefox "$(which firefox 2>/dev/null)"
link_tool wmctrl "$(which wmctrl 2>/dev/null)"

echo "Checking OBS..."

if flatpak info com.obsproject.Studio >/dev/null 2>&1; then

cat > "$TOOLS/bin/obs" << 'EOF'
#!/usr/bin/env bash
exec flatpak run com.obsproject.Studio "$@"
EOF

chmod +x "$TOOLS/bin/obs"

echo "✓ Flatpak OBS wrapper created"

elif command -v obs >/dev/null 2>&1; then

ln -sf "$(which obs)" "$TOOLS/bin/obs"

echo "✓ Native OBS linked"

else

echo "✗ OBS not found"

fi

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Runtime Ready"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
