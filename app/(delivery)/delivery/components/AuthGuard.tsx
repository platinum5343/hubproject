"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTokenRefresh from "../hooks/useTokenRefresh";


/**
 * Protects every page inside the customer delivery dashboard.
 *
 * Rules:
 *  1. No token at all       → redirect to / (landing page)
 *  2. Token + is_courier    → redirect to /courier-onboarding
 *     (courier used the customer URL — send them to their own screen)
 *  3. Token + !is_courier   → render children (customer is allowed in)
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // Keep access token fresh while the dashboard is open.
  useTokenRefresh();

  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);


  useEffect(() => {
    const token =
      localStorage.getItem("dispatch_hub_token") ||
      sessionStorage.getItem("dispatch_hub_token");

    if (!token) {
      router.replace("/");
      setChecked(true);
      return;
    }

    // Check role — isCourier is stored in dispatch_hub_user by loginSuccess()
    try {
      const raw = localStorage.getItem("dispatch_hub_user");
      const user = raw ? JSON.parse(raw) : null;

      if (user?.isCourier === true) {
        // Courier tried to access the customer dashboard
        router.replace("/courier-onboarding");
        setChecked(true);
        return;
      }
    } catch {
      // Malformed user data — treat as unauthenticated
      router.replace("/");
      setChecked(true);
      return;
    }

    // Valid customer token
    setAllowed(true);
    setChecked(true);
  }, [router]);

  if (!checked || !allowed) return null;

  return <>{children}</>;
}