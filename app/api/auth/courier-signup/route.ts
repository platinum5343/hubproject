// Proxies POST /api/auth/courier-signup → POST /user/courier-signup/
// Edge runtime required for Cloudflare Pages.
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API, PROXY_HEADERS } from "../../config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);

    let res: Response;
    try {
      res = await fetch(API.COURIER_SIGNUP, {
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
      console.error(
        `[courier-signup] non-JSON — backend: ${API.COURIER_SIGNUP} | status: ${res.status} | responseType: ${contentType} | body(first400): ${text.slice(0, 400)}`,
      );
      return NextResponse.json(
        { detail: `Backend error (${res.status}) — unexpected response format.` },
        { status: 502 },
      );
    }

    const data = await res.json();
    console.log(
      `[courier-signup] success — backend: ${API.COURIER_SIGNUP} | status: ${res.status}`,
    );
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    const isAbort = message.toLowerCase().includes("aborted") || message.toLowerCase().includes("abort");
    console.error(`[courier-signup] fetch error: ${message} | abort=${isAbort}`);

    return NextResponse.json(
      {
        detail: isAbort
          ? "Request timed out while contacting the backend."
          : `Network error: ${message}`,
      },
      { status: isAbort ? 504 : 502 },
    );
  }
}

