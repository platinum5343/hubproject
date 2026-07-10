"use client"; // 🧠 Tells Next.js: "This is browser-only code. Do not bundle into Edge workers."

import { Middleware } from "@reduxjs/toolkit";

const STORAGE_KEY = "dispatch_hub_map_state";

const CLEAR_ACTIONS = new Set([
  "map/closeJobCreation",
  "map/resetJobCreation",
]);

// ── Hydration ────────────────────────────────────────────────────────────────
// Returns a plain object (no circular RootState reference needed here).
export function loadPersistedMapState(): Record<string, unknown> | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const saved = JSON.parse(raw) as Record<string, unknown>;
    return {
      ...saved,
      isLoadingPayment: false,
      paymentVerified: false,
      showCardOverlay: false,
    };
  } catch {
    return undefined;
  }
}

export function clearPersistedMapState() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}

// ── Persistence middleware ────────────────────────────────────────────────────
export const persistMapMiddleware: Middleware =
  (api) => (next) => (action) => {
    const result = next(action);

    if (typeof window === "undefined") return result;

    const actionType = (action as { type?: string }).type ?? "";
    if (!actionType.startsWith("map/")) return result;

    if (CLEAR_ACTIONS.has(actionType)) {
      clearPersistedMapState();
      return result;
    }

    try {
      const state = api.getState() as { map: unknown };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.map));
    } catch {
      // Quota exceeded or private browsing — fail silently
    }

    return result;
  };