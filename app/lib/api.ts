// ─────────────────────────────────────────────────────────────────────────────
// SERVER-SIDE data fetching layer.
// All functions here run on the server — the auth token is read from the
// request context (cookies), never from localStorage.
//
// Usage in a Server Component:
//   import { getScheduledJobs } from "@/app/lib/api";
//   const jobs = await getScheduledJobs(token);
//
// Usage pattern — parallel fetch (avoids waterfall):
//   const [jobs, notifications] = await Promise.all([
//     getScheduledJobs(token),
//     getNotifications(token),
//   ]);
// ─────────────────────────────────────────────────────────────────────────────

const BASE = process.env.BACKEND_URL ?? "https://backend.dispatchhub.org/api";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ScheduledJob {
  id:          number;
  date:        string;
  time:        string;
  duration:    string;
  from:        string;
  to:          string;
  status?:     string;
}

export interface ActiveRide {
  id:            string | number;
  courierName:   string;
  courierInitials: string;
  status:        string;
  avatarUrl?:    string;
}

export interface Notification {
  id:     string | number;
  status: string;
  from:   string;
  to:     string;
  date:   string;
  time:   string;
  read?:  boolean;
}

export interface PaymentRecord {
  id:              string | number;
  status:          string;
  description:     string;
  amount?:         string;
  date:            string;
  time:            string;
  transactionRef?: string;
  paymentMethod?:  string;
}

export interface UserProfile {
  id:        string;
  email:     string;
  firstName: string;
  lastName:  string;
  phone?:    string;
  avatar?:   string;
}

// ── Fetch helper ──────────────────────────────────────────────────────────────

async function serverFetch<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      // next.js server cache — revalidate every 30 s by default.
      // Override per-call with { next: { revalidate: 0 } } for real-time data.
      next: { revalidate: 30, ...(options as any).next },
    });

    if (!res.ok) return null;
    return await res.json() as T;
  } catch {
    return null;
  }
}

// ── Auth helpers ──────────────────────────────────────────────────────────────

/**
 * Read the auth token from cookies in a Server Component.
 * Call at the top of any async server page that needs auth.
 *
 * Example:
 *   import { cookies } from "next/headers";
 *   import { getTokenFromCookies } from "@/app/lib/api";
 *   const token = await getTokenFromCookies();
 */
export async function getTokenFromCookies(): Promise<string | null> {
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  return jar.get("dispatch_hub_token")?.value ?? null;
}

// ── Data access functions ─────────────────────────────────────────────────────

/** Scheduled delivery jobs for the authenticated customer */
export async function getScheduledJobs(token: string): Promise<ScheduledJob[]> {
  const data = await serverFetch<ScheduledJob[]>(
    "/delivery/jobs/scheduled/",
    token,
    { next: { revalidate: 60, tags: ["scheduled-jobs"] } } as RequestInit,
  );
  return data ?? [];
}

/** Active ride for the authenticated customer (real-time — no cache) */
export async function getActiveRides(token: string): Promise<ActiveRide[]> {
  const data = await serverFetch<ActiveRide[]>(
    "/delivery/jobs/",
    token,
    { next: { revalidate: 0 } } as RequestInit, // never cache — real-time
  );
  return data ?? [];
}

/** Notifications for the authenticated customer */
export async function getNotifications(token: string): Promise<Notification[]> {
  const data = await serverFetch<Notification[]>(
    "/user/notifications/",
    token,
    { next: { revalidate: 30, tags: ["notifications"] } } as RequestInit,
  );
  return data ?? [];
}

/** Payment history for the authenticated customer */
export async function getPaymentHistory(token: string): Promise<PaymentRecord[]> {
  const data = await serverFetch<PaymentRecord[]>(
    "/delivery/jobs/received/",
    token,
    { next: { revalidate: 120, tags: ["payment-history"] } } as RequestInit,
  );
  return data ?? [];
}

/** User profile */
export async function getUserProfile(token: string): Promise<UserProfile | null> {
  return serverFetch<UserProfile>(
    "/user/profile/",
    token,
    { next: { revalidate: 300, tags: ["profile"] } } as RequestInit,
  );
}

// ── Cache invalidation helpers ────────────────────────────────────────────────
// Call these from Server Actions after mutations.
//
// Example — after creating a new job:
//   import { invalidateJobs } from "@/app/lib/api";
//   await invalidateJobs();

export async function invalidateJobs() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("scheduled-jobs", "max");
}

export async function invalidateNotifications() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("notifications", "max");
}

export async function invalidatePaymentHistory() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("payment-history", "max");
}

export async function invalidateProfile() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("profile", "max");
}