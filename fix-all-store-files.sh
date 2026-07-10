#!/bin/bash
# THE DEFINITIVE FIX — run once from your project root:
#   cd "/mnt/c/Personal Folder/Dispatch_hub Production/frontend_web_prod"
#   bash fix-and-deploy.sh

set -e
echo "╔══════════════════════════════════════════╗"
echo "║  DispatchHub — Definitive Edge Fix       ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ── Step 1: Add "use client" to every Redux store and slice file ──────────
echo "Step 1: Marking all Redux files as client-only..."

add_use_client() {
  local FILE="$1"
  [ ! -f "$FILE" ] && echo "  SKIP (not found): $FILE" && return
  FIRST=$(head -1 "$FILE")
  echo "$FIRST" | grep -q '"use client"' && echo "  ✓ $FILE" && return
  TMP=$(mktemp)
  printf '"use client";\n' > "$TMP"
  cat "$FILE" >> "$TMP"
  mv "$TMP" "$FILE"
  echo "  + $FILE"
}

add_use_client "app/(users)/store/index.ts"
add_use_client "app/(users)/store/authSlice.ts"
add_use_client "app/(users)/store/hooks.ts"
add_use_client "app/(users)/store/logisticSlice.ts"
add_use_client "app/(users)/store/mobileSidebarSlice.ts"
add_use_client "app/(users)/store/faqSlice.ts"
add_use_client "app/(delivery)/delivery/store/index.ts"
add_use_client "app/(delivery)/delivery/store/hooks.ts"
add_use_client "app/(delivery)/delivery/store/mapSlice.ts"
add_use_client "app/(delivery)/delivery/store/sidebarSlice.ts"
add_use_client "app/(delivery)/delivery/store/bookingSlice.ts"
add_use_client "app/(delivery)/delivery/store/cardSlice.ts"
add_use_client "app/(delivery)/delivery/store/cardFunctionSlice.ts"
add_use_client "app/(delivery)/delivery/store/paymentHistorySlice.ts"
add_use_client "app/(delivery)/delivery/store/scheduledDeliverySlice.ts"
add_use_client "app/(delivery)/delivery/store/trackingSlice.ts"
add_use_client "app/(delivery)/delivery/store/walletSlice.ts"

echo ""

# ── Step 2: Rewrite next.config.ts with serverExternalPackages ───────────
echo "Step 2: Updating next.config.ts..."
cat > next.config.ts << 'CONFIG'
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
  },

  // Prevents CommonJS packages from being bundled into the Cloudflare
  // edge worker where they crash with:
  //   TypeError: Cannot read properties of undefined (reading 'default')
  serverExternalPackages: [
    "@reduxjs/toolkit",
    "react-redux",
    "framer-motion",
    "@react-google-maps/api",
    "react-loader-spinner",
    "react-parallax",
    "react-icons",
  ],
};

export default nextConfig;
CONFIG
echo "  ✓ next.config.ts updated"
echo ""

# ── Step 3: Verify critical files ────────────────────────────────────────
echo "Step 3: Verifying..."
FAILED=0
for FILE in \
  "app/(users)/store/index.ts" \
  "app/(users)/store/authSlice.ts" \
  "app/(delivery)/delivery/store/index.ts" \
  "app/(delivery)/delivery/store/mapSlice.ts"
do
  FIRST=$(head -1 "$FILE")
  if echo "$FIRST" | grep -q '"use client"'; then
    echo "  ✓ $FILE"
  else
    echo "  ✗ FAILED: $FILE"
    FAILED=$((FAILED + 1))
  fi
done

grep -q "serverExternalPackages" next.config.ts && echo "  ✓ next.config.ts" || { echo "  ✗ next.config.ts missing serverExternalPackages"; FAILED=$((FAILED+1)); }

if [ $FAILED -gt 0 ]; then
  echo ""
  echo "ERROR: verification failed. Fix manually before deploying."
  exit 1
fi
echo ""

# ── Step 4: Wipe ALL caches and deploy ───────────────────────────────────
echo "Step 4: Wiping cache..."
rm -rf .next .open-next
echo "  ✓ .next and .open-next deleted"
echo ""

echo "Step 5: Deploying..."
git add -A
git commit -m "fix: serverExternalPackages + use client on all Redux files — definitive edge worker fix"
git push

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║  DONE — watch Cloudflare build log       ║"
echo "║  Login should work after deploy          ║"
echo "╚══════════════════════════════════════════╝"