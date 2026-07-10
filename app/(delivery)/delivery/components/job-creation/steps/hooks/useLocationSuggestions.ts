import { useCallback, useEffect, useRef, useState } from "react";

export interface LocationSuggestion {
  description: string;
  placeId: string;
  mainText: string;
  secondaryText?: string;
}

interface GooglePlacesResponse {
  predictions: Array<{
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text?: string;
    };
  }>;
  status: string;
  error?: string;
}

const API_ENDPOINT = "/api/locations/suggestions";
const MIN_INPUT_LENGTH = 3;
const DEBOUNCE_DELAY_MS = 350;

export const useLocationSuggestions = () => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      abortControllerRef.current?.abort();
    };
  }, []);

  const fetchSuggestions = useCallback((input: string): void => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!input.trim() || input.trim().length < MIN_INPUT_LENGTH) {
      setSuggestions([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    debounceTimer.current = setTimeout(async () => {
      // Cancel any previous in-flight request
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const url = `${API_ENDPOINT}?input=${encodeURIComponent(input.trim())}`;
        const res = await fetch(url, {
          signal: abortControllerRef.current.signal,
        });

        // AbortError means the user typed again — silently ignore
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data: GooglePlacesResponse = await res.json();

        if (data.error) {
          setError(data.error);
          setSuggestions([]);
          return;
        }

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
          console.warn(`Google Places API status: ${data.status}`);
        }

        if (data.predictions?.length > 0) {
          setSuggestions(
            data.predictions.map((p) => ({
              description: p.description,
              placeId: p.place_id,
              mainText: p.structured_formatting.main_text,
              secondaryText: p.structured_formatting.secondary_text,
            })),
          );
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        // Ignore abort errors — they're intentional
        if (err instanceof Error && err.name === "AbortError") return;

        const message =
          err instanceof Error ? err.message : "Failed to fetch suggestions";
        console.error("Location suggestions error:", message);
        setError(message);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY_MS);
  }, []);

  const clearSuggestions = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    abortControllerRef.current?.abort();
    setSuggestions([]);
    setError(null);
    setLoading(false);
  }, []);

  return { suggestions, loading, error, fetchSuggestions, clearSuggestions };
};