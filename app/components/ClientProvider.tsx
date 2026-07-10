// CLIENT BOUNDARY — CSR
// ──────────────────────
// Outermost "use client" boundary in the root layout.
// Previously showed a black spinner on every first load — removed.
//
// Since all pages are SSR'd, the HTML content is already streamed to the
// browser before React hydrates. No spinner is needed — the page content
// is visible immediately. React hydrates silently in the background and
// attaches event handlers without any visible flash.
"use client";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}