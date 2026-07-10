// next.config.ts
//
// RENDERING STRATEGY
// ──────────────────
// SSR  (Server-Side Rendering)  — pages whose content changes per request
//                                  or that need auth-gated data.
//                                  Set via `export const dynamic = "force-dynamic"`
//                                  on each page. Cloudflare runs these as edge
//                                  workers — no static file generated.
//
// SSG  (Static Site Generation) — pages whose content never changes at runtime:
//                                  /privacy, /terms-and-conditions, /blog, etc.
//                                  These are pre-built at deploy time and served
//                                  as static files from the CDN. Zero server cost.
//
// CSR  (Client-Side Rendering)  — interactive UI within a page (maps, modals,
//                                  forms, Redux-driven dashboards). Handled by
//                                  "use client" components inside SSR/SSG shells.
//
// RULE:
//   - Public marketing pages (/privacy, /terms) → SSG (no `dynamic` export)
//   - Auth-dependent pages (/, /delivery/*, /map) → SSR (force-dynamic)
//   - Interactive UI within pages → CSR ("use client" components)

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  reactStrictMode: false,

  images: {
    // Cloudflare Pages does not support Next.js Image Optimization.
    // Images are served directly from /public via CDN.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
  },


};

export default nextConfig;

