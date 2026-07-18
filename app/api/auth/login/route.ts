// WHY "Invalid response from server" ON LIVE BUT NOT LOCALHOST:
//
// The Cloudflare Worker calls backend.dispatchhub.org server-to-server.
// On localhost the Next.js dev server does the same call but from your
// machine — and it works. The difference on live is one of:
//
//   1. CORS / preflight rejection  — backend returns HTML 403 page
//   2. Django CSRF middleware       — rejects POST with no CSRF cookie
//   3. Redirect HTTP → HTTPS        — fetch follows the redirect but
//                                     loses the POST body (becomes GET)
//   4. Cloudflare in front of the backend blocking the Worker's IP
//
// This route now logs the exact HTTP status + first 400 chars of any
// non-JSON response to Cloudflare's observability logs so you can see
// exactly which case is happening. Check:
//   Cloudflare Dashboard → Workers & Pages → your project → Logs

export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API, PROXY_HEADERS } from "../../config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log the incoming payload shape (no sensitive password value)
    console.log(
      `[login] request body keys: ${Object.keys(body ?? {}).join(",")}`,
      `email=${typeof body?.email === "string" ? body.email : ""}`,
    );


    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    let res: Response;
    try {
      res = await fetch(API.LOGIN, {
        method: "POST",
        headers: PROXY_HEADERS,
        body: JSON.stringify(body),
        redirect: "follow",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(
        `[login] non-JSON — status: ${res.status} | redirected: ${res.redirected} → ${res.url} | body: ${text.slice(0, 400)}`
      );
      return NextResponse.json(
        {
          detail:
            res.status === 403 ? "Server rejected the request (403). Check backend CORS/CSRF config." :
            res.status === 429 ? "Too many login attempts. Please wait a few minutes and try again." :
            `Backend error (${res.status}) — unexpected response format.`,
        },
        { status: res.status === 429 ? 429 : 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    const isTimeout = message.includes("abort") || message.includes("timeout");
    console.error(`[login] fetch error: ${message}`);
    return NextResponse.json(
      { detail: isTimeout ? "Request timed out." : `Network error: ${message}` },
      { status: 502 }
    );
  }
}