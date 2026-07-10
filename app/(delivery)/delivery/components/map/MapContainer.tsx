"use client";

// Migration from deprecated google.maps.Marker → AdvancedMarkerElement.
//
// Two warnings fixed here:
//
// 1. "google.maps.Marker is deprecated" — replaced with AdvancedMarkerElement
//    via google.maps.importLibrary("marker") called after map load.
//
// 2. "A Map's styles property cannot be set when a mapId is present" —
//    when mapId is set Google Cloud controls styling via the console.
//    We only pass `styles` when there is NO mapId so both paths work.
//
// Requirement: add "marker" to the libraries array in the parent
// useJsApiLoader call (already done in MapComponent.tsx).

import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useMemo, useRef } from "react";
import { mapStyles } from "../../utils/mapStyles";

interface Props {
  center: { lat: number; lng: number };
  /** When true the center update is animated with panTo() instead of a hard jump */
  smoothUpdate?: boolean;
  onLoad: (map: google.maps.Map) => void;
}

export default function MapContainer({ center, smoothUpdate, onLoad }: Props) {
  const mapRef    = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  // Store the initial center in a ref so GoogleMap never re-renders from a
  // center prop change — all subsequent moves go through panTo / setCenter.
  const initialCenter = useRef(center);

  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  const options = useMemo(
    () => ({
      // styles MUST be omitted when mapId is set — Google Maps rejects the
      // combination and logs a warning. When mapId is absent we apply our
      // custom dark/neutral style as before.
      ...(mapId ? {} : { styles: mapStyles }),
      ...(mapId ? { mapId } : {}),
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
    }),
    [mapId],
  );

  const handleLoad = async (map: google.maps.Map) => {
    mapRef.current = map;
    onLoad(map);

    // AdvancedMarkerElement requires the "marker" library loaded separately
    // AND a mapId on the Map instance. Both must be present.
    if (!mapId) {
      // No mapId — AdvancedMarkerElement won't render. Skip silently.
      // Map still works, just without the location dot.
      return;
    }

    try {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;

      // Simple blue dot representing the user's current location.
      const dot = document.createElement("div");
      dot.style.cssText = `
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #4285F4;
        border: 2.5px solid #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,0.35);
      `;

      markerRef.current = new AdvancedMarkerElement({
        map,
        position: center,
        title: "Your location",
        content: dot,
      });
    } catch (e) {
      console.warn("[MapContainer] AdvancedMarkerElement unavailable:", e);
    }
  };

  // Keep marker + viewport in sync when GPS refines after IP-geolocation.
  useEffect(() => {
    if (!mapRef.current) return;
    if (smoothUpdate) {
      mapRef.current.panTo(center);
    } else {
      mapRef.current.setCenter(center);
    }
    if (markerRef.current) {
      markerRef.current.position = center;
    }
  }, [center, smoothUpdate]);

  // Remove the marker from the map on unmount to avoid memory leaks.
  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
        markerRef.current     = null;
      }
    };
  }, []);

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={initialCenter.current}
      zoom={15}
      options={options}
      onLoad={handleLoad}
    />
  );
}