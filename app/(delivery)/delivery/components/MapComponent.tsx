"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useCurrentLocation } from "./map/hooks/useCurrentLocation";
import { useScreenType } from "./map/hooks/useScreenType";
import { useState } from "react";
import MapContainer from "./map/MapContainer";
import MapOverlays from "./map/MapOverlays";
import MapPlaceholder from "./map/MapPlaceholder";
import MapLoading from "./map/MapLoading";

// "marker" must be in the libraries array so that google.maps.importLibrary("marker")
// works inside MapContainer. Without it the AdvancedMarkerElement throws a
// "marker library not loaded" error at runtime.
const LIBRARIES: ["places", "marker"] = ["places", "marker"];
const DUMMY_API_KEY = "YOUR_API_KEY_HERE";

export default function MapComponent() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || DUMMY_API_KEY;
  const isDummyKey = apiKey === DUMMY_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const { coords, gpsReady, error } = useCurrentLocation();
  const { isMobile, isDesktop } = useScreenType();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  if (isDummyKey) return <MapPlaceholder />;

  if (!isLoaded) return <MapLoading message="Loading map…" />;

  // Block until we have a real location (IP geolocation resolves in ~200ms —
  // ensures the map never opens on a wrong hardcoded city).
  if (!coords) return <MapLoading message="Finding your location…" />;

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <MapContainer
        center={coords}
        smoothUpdate={gpsReady}
        onLoad={setMap}
      />
      <MapOverlays isMobile={isMobile} isDesktop={isDesktop} />
      {error && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-400/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs z-10 whitespace-nowrap">
          📍 {error}
        </div>
      )}
    </div>
  );
}