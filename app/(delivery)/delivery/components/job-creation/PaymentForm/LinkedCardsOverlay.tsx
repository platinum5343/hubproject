"use client";
import { useAppSelector } from "../../../store/hooks";
import HasCards from "./card-status/HasCards";
import NoCards from "./card-status/NoCards";

interface LinkedCardsOverlayProps {
  onClose: () => void;
}

const LinkedCardsOverlay = ({ onClose }: LinkedCardsOverlayProps) => {
  const { cardNumber } = useAppSelector((state) => state.wallet);

  const hasCards = cardNumber > 0;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/20 bg-opacity-30 backdrop-blur-sm z-50"
        onClick={(e) => {
          // Prevent closing during verification
          const target = e.target as HTMLElement;
          if (target.classList.contains("bg-black/20")) {
            onClose();
          }
        }}
      />

      {/* Overlay content */}
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-[2rem] z-50 animate-slide-up max-h-[75vh] flex flex-col">
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {hasCards ? (
            // Show linked cards
            <HasCards onClose={onClose} hasCards={hasCards} />
          ) : (
            // Show no cards message
            <NoCards onClose={onClose} />
          )}
        </div>
      </div>
    </>
  );
};

export default LinkedCardsOverlay;
