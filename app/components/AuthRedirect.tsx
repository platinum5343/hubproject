"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Reads the persisted auth token from localStorage.
 * - Authenticated  → /dashboard  (the delivery map)
 * - Guest          → /home       (landing page)
 *
 * This runs only on the client so it never blocks SSR.
 */
export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // We store the token under "dispatch_hub_token" when the user logs in.
    // If the key exists and is non-empty, treat the user as authenticated.
    const token =
      localStorage.getItem("dispatch_hub_token") ||
      sessionStorage.getItem("dispatch_hub_token");

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/home");
    }
  }, [router]);

  // Render nothing — the redirect fires before anything is painted.
  return null;
}