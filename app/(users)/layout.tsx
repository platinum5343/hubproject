// USERS LAYOUT — Server Component (SSR)
// ──────────────────────────────────────
// Runs on the server. Provides rich SEO metadata for all public-facing
// pages (/, /privacy, /terms-and-conditions, /map).
// ClientProvider and Navbar are "use client" — they hydrate in the browser.
// This layout itself stays a Server Component for optimal streaming.

import type { Metadata, Viewport } from "next";
import "../globals.css";
import ClientProvider from "./components/ClientProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Dispatch Hub — Deliver anywhere, now",
    template: "%s | Dispatch Hub",
  },
  description:
    "Fast, reliable, and eco-friendly delivery solutions that keep your business moving efficiently.",
  keywords: ["delivery", "logistics", "dispatch", "Nigeria", "Port Harcourt"],
  openGraph: {
    title: "Dispatch Hub",
    description: "Deliver anywhere now with Dispatch Hub.",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dispatch Hub",
    description: "Deliver anywhere now with Dispatch Hub.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FE581C",
  width: "device-width",
  initialScale: 1,
};

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ClientProvider>
  );
}