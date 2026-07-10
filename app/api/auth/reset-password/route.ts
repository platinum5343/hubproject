// Proxies POST /api/auth/reset-password → POST /user/password-reset-confirm/{uidb64}/{token}/
// Body: { uidb64, token, new_password, new_password2 }
// The uidb64 and token come from the email link query params the user lands on.
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API, PROXY_HEADERS } from "../../config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uidb64, token, new_password, new_password2 } = body;

    if (!uidb64 || !token) {
      return NextResponse.json(
        { detail: "Missing password reset token. Please use the link from your email." },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    let res: Response;
    try {
      res = await fetch(`${API.RESET_PASSWORD_CONFIRM}${uidb64}/${token}/`, {
        method: "POST",
        headers: PROXY_HEADERS,
        body: JSON.stringify({ new_password, new_password2 }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(`[reset-password] non-JSON — status: ${res.status} | body: ${text.slice(0, 400)}`);
      return NextResponse.json(
        { detail: `Backend error (${res.status}) — unexpected response format.` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error(`[reset-password] fetch error: ${message}`);
    return NextResponse.json({ detail: `Network error: ${message}` }, { status: 502 });
  }
}