import React from "react";
import PrimaryButton from "../../../shared/PrimaryButton";
import { useRouter } from "next/navigation";

interface LinkedCardsOverlayProps {
  onClose: () => void;
}

const NoCards = ({ onClose }: LinkedCardsOverlayProps) => {
  const router = useRouter();
  const handleAddCard = () => {
    router.push("/delivery/wallet/add-new-card/");
  };
  return (
    <>
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="text-[1.25rem] font-medium leading-[1.75rem]">
          No Linked Cards
        </h3>
        <p className="text-[#616161] text-[0.875rem] leading-[1.125rem]">
          You haven't linked any cards yet. Please add a card to continue with
          wallet payment.
        </p>
      </div>

      {/* Illustration or empty state */}
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="6"
              width="20"
              height="12"
              rx="2"
              stroke="#A5A5A5"
              strokeWidth="2"
            />
            <path d="M2 10h20" stroke="#A5A5A5" strokeWidth="2" />
          </svg>
        </div>
        <p className="text-[#A5A5A5] text-center">
          Add your first card to get started
        </p>
      </div>

      {/* Add card buttons */}
      <div className="flex flex-col gap-3">
        <PrimaryButton label="Add New Card" onClick={handleAddCard} fullWidth />
        <button
          onClick={onClose}
          className="w-full py-4 px-8 rounded-[2rem] bg-gray-200 hover:bg-gray-300 transition-colors text-[1rem]"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default NoCards;
