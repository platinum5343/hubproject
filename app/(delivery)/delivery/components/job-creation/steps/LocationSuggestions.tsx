"use client";

import { LocationSuggestion } from "./hooks/useLocationSuggestions";

interface LocationSuggestionsProps {
  suggestions: LocationSuggestion[];
  loading: boolean;
  error?: string | null;
  onSelect: (suggestion: LocationSuggestion) => void;
  visible: boolean;
  /** Opens dropdown above the input instead of below */
  dropUp?: boolean;
  /**
   * When provided, the component renders as a block element using this style
   * instead of `position: absolute`. Used when the caller renders via a portal
   * (e.g. StopInput) so the dropdown escapes overflow-clipping parents.
   */
  portalStyle?: React.CSSProperties;
}

const SuggestionsList = ({
  suggestions,
  loading,
  error,
  onSelect,
}: Pick<LocationSuggestionsProps, "suggestions" | "loading" | "error" | "onSelect">) => {
  if (loading) {
    return (
      <div className="p-4 text-center text-[#999999] text-sm">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
          <div className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="p-4 text-center text-red-500 text-sm">Could not load suggestions</div>;
  }
  if (suggestions.length === 0) {
    return <div className="p-4 text-center text-[#999999] text-sm">No suggestions found</div>;
  }
  return (
    <ul className="divide-y divide-[#F0F0F0]">
      {suggestions.map((suggestion, index) => (
        <li
          key={`${suggestion.placeId}-${index}`}
          onMouseDown={(e) => {
            e.preventDefault(); // prevents blur racing ahead of click
            onSelect(suggestion);
          }}
          className="p-3 cursor-pointer hover:bg-[#F8F8F8] transition-colors duration-150 active:bg-[#F0F0F0] select-none"
        >
          <div className="flex items-start gap-3">
            <svg className="w-4 h-4 text-[#FE581C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#333333] truncate">{suggestion.mainText}</div>
              {suggestion.secondaryText && (
                <div className="text-xs text-[#999999] mt-0.5 truncate">{suggestion.secondaryText}</div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const LocationSuggestions = ({
  suggestions,
  loading,
  error,
  onSelect,
  visible,
  dropUp = false,
  portalStyle,
}: LocationSuggestionsProps) => {
  if (!visible) return null;

  // ── Portal mode ────────────────────────────────────────────────────────────
  // The caller renders this via createPortal at body level and passes fixed
  // coordinates. We render as a plain block — no absolute positioning.
  if (portalStyle) {
    return (
      <div
        style={portalStyle}
        className="bg-white rounded-lg border border-[#E8E8E8] shadow-lg max-h-64 overflow-y-auto"
      >
        <SuggestionsList suggestions={suggestions} loading={loading} error={error} onSelect={onSelect} />
      </div>
    );
  }

  // ── Normal (absolute) mode ─────────────────────────────────────────────────
  const positionClass = dropUp ? "bottom-full mb-2" : "top-full mt-2";
  return (
    <div className={`absolute ${positionClass} left-0 right-0 bg-white rounded-lg border border-[#E8E8E8] shadow-lg z-50 max-h-64 overflow-y-auto`}>
      <SuggestionsList suggestions={suggestions} loading={loading} error={error} onSelect={onSelect} />
    </div>
  );
};

export default LocationSuggestions;