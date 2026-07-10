// Proxies POST /api/auth/forgot-password → POST /user/request-password-reset/
// Sends { email } — backend emails the user a password-reset link.
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API, PROXY_HEADERS } from "../../config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    let res: Response;
    try {
      res = await fetch(API.FORGOT_PASSWORD, {
        method: "POST",
        headers: PROXY_HEADERS,
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(`[forgot-password] non-JSON — status: ${res.status} | body: ${text.slice(0, 400)}`);
      return NextResponse.json(
        { detail: `Backend error (${res.status}) — unexpected response format.` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error(`[forgot-password] fetch error: ${message}`);
    return NextResponse.json({ detail: `Network error: ${message}` }, { status: 502 });
  }
}