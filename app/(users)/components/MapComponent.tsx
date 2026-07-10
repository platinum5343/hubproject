"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useCurrentLocation } from "../../(delivery)/delivery/components/map/hooks/useCurrentLocation";
import { useState } from "react";
import MapContainer from "../../(delivery)/delivery/components/map/MapContainer";
import MapPlaceholder from "../../(delivery)/delivery/components/map/MapPlaceholder";
import MapLoading from "../../(delivery)/delivery/components/map/MapLoading";

// "marker" must be included so that google.maps.importLibrary("marker")
// works inside MapContainer for AdvancedMarkerElement.
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
  const [map, setMap] = useState<google.maps.Map | null>(null);

  if (isDummyKey) return <MapPlaceholder />;
  if (!isLoaded) return <MapLoading message="Loading map…" />;
  if (!coords) return <MapLoading message="Finding your location…" />;

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <MapContainer center={coords} smoothUpdate={gpsReady} onLoad={setMap} />
      {error && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-400/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs z-10 whitespace-nowrap">
          📍 {error}
        </div>
      )}
    </div>
  );
}