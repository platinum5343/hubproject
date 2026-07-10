// Proxies POST /api/auth/change-password → POST /user/change-password/
// Requires Authorization header.
// Body: { old_password, new_password, new_password2 }
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API, PROXY_HEADERS } from "../../config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization") ?? "";

    if (!authHeader) {
      return NextResponse.json({ detail: "Authentication required." }, { status: 401 });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(API.CHANGE_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error("[change-password] backend returned non-JSON:", text.slice(0, 200));
      return NextResponse.json(
        { detail: "Backend error — unexpected response format" },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error("[change-password] error:", message);
    return NextResponse.json({ detail: message }, { status: 502 });
  }
}
