"use client";

import SearchDropOffLocation from "../../icons/SearchDropOffLocation";
import MapDropOffLocation from "../../icons/MapDropOffLocation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AddStopsIcon from "../../icons/AddStopsIcon";
import InfoIcon from "../../icons/InfoIcon";
import SendIcon from "../../icons/SendIcon";
import ReceiveIcon from "../../icons/ReceiveIcon";
import SearchCurrentLocation from "../../icons/SearchCurrentLocation";
import DeleteStop from "../../icons/DeleteStop";
import {
  addDeliveryStop,
  nextStep,
  prevStep,
  removeDeliveryStop,
  setDeliveryType,
  setMultipleDeliveryInfo,
  updateDeliveryStop,
} from "../../../store/mapSlice";
import PreviousIcon from "../../icons/PreviousIcon";
import { useLocationSuggestions } from "./hooks/useLocationSuggestions";
import LocationSuggestions from "./LocationSuggestions";
import type { LocationSuggestion } from "./hooks/useLocationSuggestions";

// ─────────────────────────────────────────────────────────────────────────────
// StopInput — a single additional-stop row with its own debounced autocomplete.
//
// Why portal?
//   The form container uses overflow-hidden and the stop list uses
//   overflow-y-auto. Both clip absolutely-positioned children, so a normal
//   dropdown (even with dropUp) is invisible. createPortal renders the dropdown
//   directly on document.body and we position it with fixed coords calculated
//   from the input's getBoundingClientRect() — completely unaffected by any
//   ancestor overflow setting.
// ─────────────────────────────────────────────────────────────────────────────
const StopInput = ({
  stop,
  index,
  onUpdate,
  onRemove,
}: {
  stop: { id: string; location: string };
  index: number;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}) => {
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // portal SSR guard
  const [dropdownRect, setDropdownRect] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { suggestions, loading, error, fetchSuggestions, clearSuggestions } =
    useLocationSuggestions();

  // Mount guard — portals are client-only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate where to anchor the dropdown.
  // We open it ABOVE the input (dropup) since it lives near the bottom.
  const calculateRect = useCallback(() => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setDropdownRect({ top: r.top, left: r.left, width: r.width });
  }, []);

  // Recalculate when the scroll container scrolls (stop list is scrollable)
  useEffect(() => {
    const scrollParent = containerRef.current?.closest("[data-stop-scroll]");
    if (!scrollParent) return;
    const onScroll = () => {
      if (suggestionsVisible) calculateRect();
    };
    scrollParent.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollParent.removeEventListener("scroll", onScroll);
  }, [suggestionsVisible, calculateRect]);

  // ── Typing ──────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUpdate(stop.id, value);
    fetchSuggestions(value);
    setSuggestionsVisible(value.trim().length > 0);
    if (!value.trim()) clearSuggestions();
  };

  // ── Selection ────────────────────────────────────────────────────────────
  const handleSelect = (suggestion: LocationSuggestion) => {
    onUpdate(stop.id, suggestion.description);
    setSuggestionsVisible(false);
    clearSuggestions();
  };

  // ── Close on click-outside ───────────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestionsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = isFocused || stop.location.length > 0;

  // Dropdown portal — renders at body level to escape all overflow clipping
  const dropdownPortal =
    isMounted &&
    suggestionsVisible &&
    stop.location.trim().length > 0 &&
    dropdownRect
      ? createPortal(
          <div
            style={{
              position: "fixed",
              // Open upward: anchor bottom of dropdown to top of input - 8px gap
              bottom: window.innerHeight - dropdownRect.top + 8,
              left: dropdownRect.left,
              width: dropdownRect.width,
              zIndex: 9999,
            }}
            className="bg-white rounded-lg border border-[#E8E8E8] shadow-xl max-h-56 overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 flex items-center justify-center gap-2">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-500 text-sm">
                Could not load suggestions
              </div>
            ) : suggestions.length === 0 ? (
              <div className="p-4 text-center text-[#999999] text-sm">
                No suggestions found
              </div>
            ) : (
              <ul className="divide-y divide-[#F0F0F0]">
                {suggestions.map((suggestion, i) => (
                  <li
                    key={`${suggestion.placeId}-${i}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(suggestion);
                    }}
                    className="p-3 cursor-pointer hover:bg-[#F8F8F8] active:bg-[#F0F0F0] select-none transition-colors duration-150"
                  >
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-[#FE581C] mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#333333] truncate">
                          {suggestion.mainText}
                        </p>
                        {suggestion.secondaryText && (
                          <p className="text-xs text-[#999999] mt-0.5 truncate">
                            {suggestion.secondaryText}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>,
          document.body
        )
      : null;

  return (
    <div ref={containerRef} className="relative w-full flex-shrink-0">
      <div
        className={`flex h-[3.125rem] py-[0.315rem] px-[0.625rem] items-center gap-2 rounded-[2.5rem] w-full transition-all duration-200 ${
          isActive ? "bg-[#FDFDFD] border border-[#FE581C]" : "bg-[#F8F8F8]"
        }`}
      >
        <div className="flex p-2 items-center justify-center">
          <SearchCurrentLocation />
        </div>
        <input
          type="text"
          placeholder={`Enter delivery stop ${index + 1}`}
          value={stop.location}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            calculateRect();
            if (stop.location.trim()) setSuggestionsVisible(true);
          }}
          onBlur={() => setIsFocused(false)}
          className="flex py-1 items-start gap-[0.625rem] focus:outline-none w-full text-[0.875rem] leading-[1.125rem] bg-transparent"
        />
        <button
          type="button"
          onClick={() => onRemove(stop.id)}
          className="flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer flex-shrink-0"
          aria-label="Remove stop"
        >
          <DeleteStop />
        </button>
      </div>

      {/* Portal dropdown — renders on document.body to escape overflow clipping */}
      {dropdownPortal}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AddDeliveryStops (main component)
// ─────────────────────────────────────────────────────────────────────────────
const AddDeliveryStops = () => {
  const dispatch = useAppDispatch();
  const { currentLocation, deliveryLocation, additionalStops } = useAppSelector(
    (state) => state.map,
  );

  const handleAddStop = () => {
    if (additionalStops.length < 3) dispatch(addDeliveryStop());
  };

  const handleUpdateStop = (id: string, value: string) => {
    dispatch(updateDeliveryStop({ id, location: value }));
  };

  const handleRemoveStop = (id: string) => {
    dispatch(removeDeliveryStop(id));
  };

  const handleSubmit = (type: "send" | "receive") => {
    if (!currentLocation || !deliveryLocation) {
      alert("Please ensure pickup and delivery locations are filled");
      return;
    }
    const hasEmptyStops = additionalStops.some((s: { id: string; location: string }) => !s.location.trim());
    if (hasEmptyStops) {
      alert("Please fill in all delivery stop locations before continuing");
      return;
    }
    dispatch(setDeliveryType(type));
    dispatch(nextStep());
  };

  const canAddMoreStops = additionalStops.length < 3;
  const hasAdditionalStops = additionalStops.length > 0;

  return (
    <div className="w-full h-[87%] md:h-full flex flex-col gap-6">
      <div
        onClick={() => dispatch(prevStep())}
        className="cursor-pointer hover:opacity-75 transition-all duration-500 ease-in-out"
      >
        <PreviousIcon />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full flex flex-col items-start gap-4 unageo-regular h-full relative overflow-hidden"
      >
        {/* Pickup — read-only */}
        <div className="flex h-[3.125rem] py-[0.315rem] px-[0.625rem] items-center gap-2 rounded-[2.5rem] bg-[#FDFDFD] w-full border border-[#FE581C] flex-shrink-0">
          <div className="flex p-2 items-center justify-center">
            <SearchDropOffLocation />
          </div>
          <input
            type="text"
            value={currentLocation || ""}
            disabled
            className="flex py-1 items-start gap-[0.625rem] focus:outline-none w-full text-[0.875rem] leading-[1.125rem] bg-transparent text-[#616161]"
          />
          <MapDropOffLocation />
        </div>

        {/* Drop-off — read-only */}
        <div className="flex h-[3.125rem] py-[0.315rem] px-[0.625rem] items-center gap-2 rounded-[2.5rem] bg-[#FDFDFD] w-full border border-[#FE581C] flex-shrink-0">
          <div className="flex p-2 items-center justify-center">
            <SearchDropOffLocation />
          </div>
          <input
            type="text"
            value={deliveryLocation || ""}
            disabled
            className="flex py-1 items-start gap-[0.625rem] focus:outline-none w-full text-[0.875rem] leading-[1.125rem] bg-transparent text-[#616161]"
          />
          <MapDropOffLocation />
        </div>

        {/* Add stop button */}
        <div className="flex p-[0.625rem] flex-col gap-[0.875rem] rounded-[1.5rem] bg-[#FDFDFD] w-full flex-shrink-0">
          <div className="flex items-center gap-2 w-full">
            <button
              type="button"
              onClick={handleAddStop}
              disabled={!canAddMoreStops}
              className={`flex py-4 px-8 justify-center items-center bg-white rounded-[2rem] gap-1 w-full transition-opacity ${
                !canAddMoreStops
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <p className="text-[1rem] leading-[1.5rem] text-[#FE581C]">
                Add delivery stops{" "}
                {additionalStops.length > 0 && `(${additionalStops.length}/3)`}
              </p>
              <AddStopsIcon />
            </button>
            <div
              onClick={() => dispatch(setMultipleDeliveryInfo(true))}
              className="cursor-pointer hover:opacity-75 transition-all duration-500 ease-in-out flex-shrink-0"
            >
              <InfoIcon />
            </div>
          </div>
        </div>

        {/* Scrollable stop list — data-stop-scroll lets StopInput find this for scroll tracking */}
        <div
          data-stop-scroll
          className="w-full flex-1 overflow-y-auto min-h-0 pb-24 md:pb-0"
        >
          <div className="flex flex-col gap-4 pr-1">
            {additionalStops.map((stop: { id: string; location: string }, index: number) => (
              <StopInput
                key={stop.id}
                stop={stop}
                index={index}
                onUpdate={handleUpdateStop}
                onRemove={handleRemoveStop}
              />
            ))}
          </div>
        </div>

        {/* Send / Receive buttons */}
        <div className="flex w-full h-[3.3rem] fixed bottom-4 left-0 right-0 md:relative gap-4 justify-center items-center text-white leading-[1.5rem] bg-white md:bg-transparent px-4 md:px-0 z-50">
          {hasAdditionalStops ? (
            <button
              type="button"
              onClick={() => handleSubmit("send")}
              className="bg-[#FE581C] h-full py-4 px-8 flex items-center justify-center rounded-[2.625rem] w-full gap-2 hover:bg-[#f54708] transition-colors duration-300 cursor-pointer"
            >
              <p>Send</p>
              <SendIcon />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleSubmit("send")}
                className="bg-[#FE581C] h-full py-4 px-8 flex items-center justify-center rounded-[2.625rem] w-full gap-2 hover:bg-[#f54708] transition-colors duration-300 cursor-pointer"
              >
                <p>Send</p>
                <SendIcon />
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("receive")}
                className="bg-[#FE581C] h-full py-4 px-8 flex items-center justify-center rounded-[2.625rem] w-full gap-2 hover:bg-[#f54708] transition-colors duration-300 cursor-pointer"
              >
                <p>Receive</p>
                <ReceiveIcon />
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddDeliveryStops;