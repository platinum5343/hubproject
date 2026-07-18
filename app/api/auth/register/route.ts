// Proxies POST /api/auth/register → POST /user/customer-signup/
// Edge runtime required for Cloudflare Pages — uses manual AbortController
// (AbortSignal.timeout is not available in all edge environments).
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API, PROXY_HEADERS } from "../../config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(
      `[register] payload keys: ${Object.keys(body ?? {}).join(",")}`,
      `email=${typeof (body as any)?.email === "string" ? (body as any).email : ""}`,
    );


    const controller = new AbortController();
    // Increase timeout to reduce false aborts under slow backend responses.
    const timer = setTimeout(() => controller.abort(), 20_000);

    let res: Response;
    try {
      res = await fetch(API.CUSTOMER_SIGNUP, {
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
      console.error(`[register] non-JSON — status: ${res.status} | body: ${text.slice(0, 400)}`);
      return NextResponse.json(
        { detail: `Backend error (${res.status}) — unexpected response format.` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    const isAbort = message.toLowerCase().includes("aborted") || message.toLowerCase().includes("abort");
    console.error(`[register] fetch error: ${message} | abort=${isAbort}`);
    return NextResponse.json({
      detail: isAbort
        ? "Request timed out while contacting the backend."
        : `Network error: ${message}`,
    }, { status: isAbort ? 504 : 502 });
  }
}
