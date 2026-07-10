// Proxies POST /api/auth/logout → POST /user/logout/
// Requires Authorization header. Body: { refresh } to blacklist the refresh token.
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API, PROXY_HEADERS } from "../../config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization") ?? "";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(API.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timer);

    // Logout returns 200 with no body or a simple JSON — handle both
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error("[logout] error:", message);
    return NextResponse.json({ detail: message }, { status: 502 });
  }
}
