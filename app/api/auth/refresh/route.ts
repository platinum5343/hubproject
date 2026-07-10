// Proxies POST /api/auth/refresh → POST /user/token/refresh/
// Body: { refresh }  Returns: { access, refresh } with new tokens.
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API, PROXY_HEADERS } from "../../config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(API.TOKEN_REFRESH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error("[token-refresh] backend returned non-JSON:", text.slice(0, 200));
      return NextResponse.json(
        { detail: "Backend error — unexpected response format" },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error("[token-refresh] error:", message);
    return NextResponse.json({ detail: message }, { status: 502 });
  }
}
