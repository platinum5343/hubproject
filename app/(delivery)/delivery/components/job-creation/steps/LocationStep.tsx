"use client";

import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  closeJobCreation,
  nextStep,
  setLocationData,
} from "../../../store/mapSlice";
import SearchCurrentLocation from "../../icons/SearchCurrentLocation";
import MapCurrentLocation from "../../icons/MapCurrentLocation";
import SearchDropOffLocation from "../../icons/SearchDropOffLocation";
import MapDropOffLocation from "../../icons/MapDropOffLocation";
import PreviousIcon from "../../icons/PreviousIcon";
import { useLocationSuggestions } from "./hooks/useLocationSuggestions";
import LocationSuggestions from "./LocationSuggestions";
import type { LocationSuggestion } from "./hooks/useLocationSuggestions";

const LocationStep = () => {
  const dispatch = useAppDispatch();
  const { currentLocation, deliveryLocation } = useAppSelector(
    (state) => state.map,
  );

  const [current, setCurrent] = useState(currentLocation || "");
  const [delivery, setDelivery] = useState(deliveryLocation || "");

  const [currentFocused, setCurrentFocused] = useState(false);
  const [deliveryFocused, setDeliveryFocused] = useState(false);

  const [currentSuggestionsVisible, setCurrentSuggestionsVisible] =
    useState(false);
  const [deliverySuggestionsVisible, setDeliverySuggestionsVisible] =
    useState(false);

  const currentInputRef = useRef<HTMLDivElement>(null);
  const deliveryInputRef = useRef<HTMLDivElement>(null);

  const {
    suggestions: currentSuggestions,
    loading: currentLoading,
    error: currentError,
    fetchSuggestions: fetchCurrentSuggestions,
    clearSuggestions: clearCurrentSuggestions,
  } = useLocationSuggestions();

  const {
    suggestions: deliverySuggestions,
    loading: deliveryLoading,
    error: deliveryError,
    fetchSuggestions: fetchDeliverySuggestions,
    clearSuggestions: clearDeliverySuggestions,
  } = useLocationSuggestions();

  // ── Helper: save to Redux and advance ───────────────────────────────────
  const advance = (pickup: string, dropoff: string) => {
    dispatch(setLocationData({ currentLocation: pickup, deliveryLocation: dropoff }));
    dispatch(nextStep());
  };

  // ── Change handlers ──────────────────────────────────────────────────────
  const handleCurrentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrent(value);
    fetchCurrentSuggestions(value);
    setCurrentSuggestionsVisible(value.trim().length > 0);
    if (!value.trim()) clearCurrentSuggestions();
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDelivery(value);
    fetchDeliverySuggestions(value);
    setDeliverySuggestionsVisible(value.trim().length > 0);
    if (!value.trim()) clearDeliverySuggestions();
  };

  // ── Selection handlers ───────────────────────────────────────────────────
  // After selecting from the pickup field, focus the drop-off input.
  const deliveryInputElRef = useRef<HTMLInputElement>(null);

  const handleCurrentSelect = (suggestion: LocationSuggestion) => {
    const value = suggestion.description;
    setCurrent(value);
    setCurrentSuggestionsVisible(false);
    clearCurrentSuggestions();

    // If drop-off is already filled, advance immediately
    if (delivery.trim()) {
      advance(value, delivery);
      return;
    }

    // Otherwise move focus to the drop-off field so the user can fill it next
    setTimeout(() => deliveryInputElRef.current?.focus(), 50);
  };

  const handleDeliverySelect = (suggestion: LocationSuggestion) => {
    const value = suggestion.description;
    setDelivery(value);
    setDeliverySuggestionsVisible(false);
    clearDeliverySuggestions();

    // If pickup is also filled, advance immediately — no Continue button needed
    if (current.trim()) {
      advance(current, value);
    }
  };

  // ── Click-outside to close dropdowns ────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currentInputRef.current &&
        !currentInputRef.current.contains(event.target as Node)
      ) {
        setCurrentSuggestionsVisible(false);
      }
      if (
        deliveryInputRef.current &&
        !deliveryInputRef.current.contains(event.target as Node)
      ) {
        setDeliverySuggestionsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isCurrentActive = currentFocused || current.length > 0;
  const isDeliveryActive = deliveryFocused || delivery.length > 0;

  return (
    <div className="w-full h-[90%] md:h-full flex flex-col gap-6 overflow-hidden relative">
      <div
        onClick={() => dispatch(closeJobCreation())}
        className="cursor-pointer hover:opacity-75 transition-all duration-500 ease-in-out"
      >
        <PreviousIcon />
      </div>

      <div className="w-full flex flex-col items-start gap-4 unageo-regular">
        {/* ── Pickup location ─────────────────────────────────────────── */}
        <div ref={currentInputRef} className="relative w-full">
          <div
            className={`flex h-[3.125rem] py-[0.315rem] px-[0.625rem] items-center gap-2 rounded-[2.5rem] w-full transition-all duration-200 ${
              isCurrentActive
                ? "bg-[#FDFDFD] border border-[#FE581C]"
                : "bg-[#F8F8F8]"
            }`}
          >
            <div className="flex p-2 items-center justify-center">
              {isCurrentActive ? (
                <SearchDropOffLocation />
              ) : (
                <SearchCurrentLocation />
              )}
            </div>
            <input
              type="text"
              placeholder="Enter current location"
              value={current}
              onChange={handleCurrentChange}
              onFocus={() => {
                setCurrentFocused(true);
                if (current.trim()) setCurrentSuggestionsVisible(true);
              }}
              onBlur={() => setCurrentFocused(false)}
              className="flex py-1 items-start gap-[0.625rem] focus:outline-none w-full text-[0.875rem] leading-[1.125rem] bg-transparent"
            />
            {isCurrentActive ? <MapDropOffLocation /> : <MapCurrentLocation />}
          </div>

          <LocationSuggestions
            suggestions={currentSuggestions}
            loading={currentLoading}
            error={currentError}
            onSelect={handleCurrentSelect}
            visible={currentSuggestionsVisible && current.trim().length > 0}
          />
        </div>

        {/* ── Drop-off location ───────────────────────────────────────── */}
        <div ref={deliveryInputRef} className="relative w-full">
          <div
            className={`flex h-[3.125rem] py-[0.315rem] px-[0.625rem] items-center gap-2 rounded-[2.5rem] w-full transition-all duration-200 ${
              isDeliveryActive
                ? "bg-[#FDFDFD] border border-[#FE581C]"
                : "bg-[#F8F8F8]"
            }`}
          >
            <div className="flex p-2 items-center justify-center">
              {isDeliveryActive ? (
                <SearchDropOffLocation />
              ) : (
                <SearchCurrentLocation />
              )}
            </div>
            <input
              ref={deliveryInputElRef}
              type="text"
              placeholder="Enter drop-off location"
              value={delivery}
              onChange={handleDeliveryChange}
              onFocus={() => {
                setDeliveryFocused(true);
                if (delivery.trim()) setDeliverySuggestionsVisible(true);
              }}
              onBlur={() => setDeliveryFocused(false)}
              className="flex py-1 items-start gap-[0.625rem] focus:outline-none w-full text-[0.875rem] leading-[1.125rem] bg-transparent"
            />
            {isDeliveryActive ? (
              <MapDropOffLocation />
            ) : (
              <MapCurrentLocation />
            )}
          </div>

          <LocationSuggestions
            suggestions={deliverySuggestions}
            loading={deliveryLoading}
            error={deliveryError}
            onSelect={handleDeliverySelect}
            visible={deliverySuggestionsVisible && delivery.trim().length > 0}
          />
        </div>
      </div>
      {/* No Continue button — the step advances automatically once both
          locations are confirmed via suggestion selection. */}
    </div>
  );
};

export default LocationStep;