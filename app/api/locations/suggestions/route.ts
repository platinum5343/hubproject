// Proxies Google Places Autocomplete — keeps the API key server-side only.
// Changed to edge runtime to prevent Cloudflare bundle corruption.
export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";

const GOOGLE_PLACES_URL =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json";

function getApiKey(): string | undefined {
  return (
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input")?.trim();

  if (!input || input.length < 3) {
    return NextResponse.json(
      { predictions: [], status: "ZERO_RESULTS" },
      { status: 200 },
    );
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Google Maps API key not set.",
        predictions: [],
        status: "REQUEST_DENIED",
      },
      { status: 500 },
    );
  }

  const url = new URL(GOOGLE_PLACES_URL);
  url.searchParams.set("input", input);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("components", "country:ng");
  url.searchParams.set("language", "en");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6_000);

  try {
    const res = await fetch(url.toString(), { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    clearTimeout(timer);
    const message = err instanceof Error ? err.message : "Failed to fetch suggestions";
    console.error("Suggestions route error:", message);
    return NextResponse.json(
      { error: message, predictions: [], status: "REQUEST_DENIED" },
      { status: 500 },
    );
  }
}