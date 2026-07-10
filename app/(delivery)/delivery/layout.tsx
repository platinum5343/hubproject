// DELIVERY LAYOUT — Server Component (SSR)
// ──────────────────────────────────────────
// Provides metadata for the entire delivery dashboard section.
// All child pages use `force-dynamic` for per-request SSR because
// they are auth-gated and display user-specific data that must not
// be pre-rendered as static files.
//
// ClientProvider wraps everything to provide the Redux store — it is
// "use client" and hydrates in the browser after SSR streaming.

import type { Metadata, Viewport } from "next";
import "../../globals.css";
import { ReactNode } from "react";
import ClientProvider from "./components/ClientProvider";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Dispatch Hub",
    template: "%s | Dispatch Hub",
  },
  description: "Manage your deliveries, track packages, and more.",
  robots: {
    // Delivery dashboard is auth-gated — never index it
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FE581C",
  width: "device-width",
  initialScale: 1,
};

export default function DeliveryLayout({ children }: { children: ReactNode }) {
  return <ClientProvider>{children}</ClientProvider>;
}