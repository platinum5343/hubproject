"use client";

import { useEffect, useRef } from "react";
import { refreshToken } from "@/app/(users)/lib/authService";

// Refreshes the access token periodically (and once on mount) using
// the backend /api/auth/refresh proxy.
//
// Assumptions based on your current code:
// - access token stored in localStorage/sessionStorage as dispatch_hub_token
// - refresh token stored in sessionStorage/localStorage as dispatch_hub_refresh
// - refresh response returns { access, refresh }
export default function useTokenRefresh(options?: {
  // refresh how long before access expiry; without decoding JWT we
  // use a conservative fixed interval.
  refreshEveryMs?: number;
}) {
  const refreshEveryMs = options?.refreshEveryMs ?? 10 * 60 * 1000; // 10 min
  const timerRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getRefresh = () =>
      localStorage.getItem("dispatch_hub_refresh") ||
      sessionStorage.getItem("dispatch_hub_refresh");

    const getAccess = () =>
      localStorage.getItem("dispatch_hub_token") ||
      sessionStorage.getItem("dispatch_hub_token");

    const setTokens = (access: string, refresh: string) => {
      localStorage.setItem("dispatch_hub_token", access);
      localStorage.setItem("dispatch_hub_refresh", refresh);
    };

    const clearAuth = () => {
      localStorage.removeItem("dispatch_hub_token");
      localStorage.removeItem("dispatch_hub_refresh");
      sessionStorage.removeItem("dispatch_hub_token");
      sessionStorage.removeItem("dispatch_hub_refresh");
    };

    const doRefresh = async () => {
      if (inFlightRef.current) return;
      if (!getRefresh()) return;

      inFlightRef.current = true;
      try {
        const refresh = getRefresh();
        if (!refresh) return;

        const { ok, data } = await refreshToken(refresh);
        if (!ok) {
          // Refresh expired/invalid → force re-login
          clearAuth();
          return;
        }

        const access = data?.access;
        const newRefresh = data?.refresh;
        if (typeof access === "string" && typeof newRefresh === "string") {
          setTokens(access, newRefresh);
        }
      } catch {
        // no-op; next tick might work
      } finally {
        inFlightRef.current = false;
      }
    };

    // If the user is logged in, attempt refresh once on mount.
    if (getAccess() && getRefresh()) {
      void doRefresh();
    }

    timerRef.current = window.setInterval(() => {
      void doRefresh();
    }, refreshEveryMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshEveryMs]);
}

