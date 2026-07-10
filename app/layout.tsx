// ROOT LAYOUT — Server Component (SSR)
// ─────────────────────────────────────
// Runs on the server on every request. Never shipped to the browser.
// Renders the HTML shell, injects metadata, and wraps children in the
// loading spinner boundary (ClientProvider handles the browser-side hydration).
//
// No "use client" here — this stays a Server Component so Next.js can
// stream the HTML shell to the browser before React hydrates.

import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./components/ClientProvider";

export const metadata: Metadata = {
  title: "Dispatch Hub",
  description: "Fast, reliable delivery solutions that keep your business moving.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* ClientProvider is "use client" — mounts the loading spinner
            only in the browser, preventing SSR hydration mismatch */}
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}