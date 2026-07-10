// Proxies GET /api/delivery/scheduled-deliveries → GET /delivery/jobs/scheduled/
// Returns the list of scheduled deliveries for the authenticated user.
export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { API } from "../../config";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization") ?? "";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8_000);

    let res: Response;
    try {
      res = await fetch(API.JOBS_SCHEDULED, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) return NextResponse.json([], { status: 200 });
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });

  } catch {
    return NextResponse.json([], { status: 200 });
  }
}