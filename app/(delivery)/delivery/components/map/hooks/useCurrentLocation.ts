"use client";

import { useEffect, useRef, useState } from "react";


export interface LocationState {
  coords: { lat: number; lng: number } | null;
  /** true once GPS (not just IP geolocation) has resolved */
  gpsReady: boolean;
  /** human-readable reason if both sources failed */
  error: string | null;
}

/**
 * Resolves the user's location in two stages so the map never shows a wrong
 * hardcoded city and never blocks indefinitely:
 *
 * Stage 1 — IP geolocation (~100-300 ms)
 *   A free reverse-IP lookup gives the correct city almost instantly.
 *   The map renders as soon as this resolves.
 *
 * Stage 2 — Device GPS (1-8 s, runs in parallel)
 *   When the GPS fix arrives it calls map.panTo() for a smooth transition.
 *   The `gpsReady` flag lets consumers distinguish which stage is active.
 *
 * If both fail (offline, permissions denied, API down), `error` is set and
 * `coords` remains null so the caller can show an appropriate message.
 */
export function useCurrentLocation(): LocationState {
  const [state, setState] = useState<LocationState>({
    coords: null,
    gpsReady: false,
    error: null,
  });

  // Prevent state updates after unmount
  const alive = useRef(true);
  // Track whether GPS has already won the race so IP result is suppressed
  const gpsWon = useRef(false);

  useEffect(() => {
    alive.current = true;
    gpsWon.current = false;

    // ── Stage 1: IP geolocation ──────────────────────────────────────────────
    // ipapi.co is free, no key required, CORS-friendly.
    // Falls back to ip-api.com if the first request fails.
    const fetchIPLocation = async () => {
      const sources = [
        "https://ipapi.co/json/",
        "https://ip-api.com/json",
      ];

      for (const url of sources) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
          if (!res.ok) continue;
          const data = await res.json();

          // ipapi.co uses `latitude/longitude`, ip-api.com uses `lat/lon`
          const lat = parseFloat(data.latitude ?? data.lat);
          const lng = parseFloat(data.longitude ?? data.lon);

          if (!isNaN(lat) && !isNaN(lng) && alive.current && !gpsWon.current) {
            setState((prev) => ({
              ...prev,
              coords: { lat, lng },
              error: null,
            }));
          }
          return; // success — stop trying other sources
        } catch {
          // timeout or network error — try next source
        }
      }

      // Both IP sources failed — GPS is our only hope now; if it also fails,
      // the error handler below will set the error state.
    };

    fetchIPLocation();

    // ── Stage 2: Device GPS ──────────────────────────────────────────────────
    if (!("geolocation" in navigator)) {
      if (alive.current) {
        setState((prev) => ({
          ...prev,
          error: "Location services are not available on this device",
        }));
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!alive.current) return;
        gpsWon.current = true;
        setState({
          coords: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          gpsReady: true,
          error: null,
        });
      },
      (err) => {
        // GPS denied or timed out.
        // IP geolocation should already be showing the right city — just
        // surface a subtle note if the user explicitly denied permission.
        if (!alive.current) return;
        const msg =
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied — showing approximate position"
            : null; // timeout / unavailable: IP geolocation is sufficient, stay silent
        setState((prev) => ({ ...prev, gpsReady: false, error: msg }));
      },
      {
        enableHighAccuracy: true,
        timeout: 8_000,
        maximumAge: 60_000,
      },
    );

    return () => {
      alive.current = false;
    };
  }, []);

  return state;
}