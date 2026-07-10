"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openEditFunction } from "../../store/cardFunctionSlice";
import { openRemoveModal, closeRemoveModal, removeActiveCard } from "../../store/cardSlice";

// ── Remove confirmation modal ─────────────────────────────────────────────────
const RemoveCardModal = () => {
  const dispatch = useAppDispatch();
  const totalCards = useAppSelector((state) => state.card.totalCards);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.22 }}
        className="bg-white rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6 shadow-xl"
      >
        {/* Icon */}
        <div className="w-14 h-14 bg-[#C6282808] rounded-full flex items-center justify-center">
          <Image
            src="/delivery/wallet/remove-card.svg"
            alt="remove"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="unageo text-[1.1rem] font-semibold leading-[1.5rem]">
            Remove Card
          </h3>
          <p className="unageo-regular text-[0.875rem] text-[#616161] leading-[1.4rem]">
            Are you sure you want to remove this card? This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <button
            onClick={() => dispatch(closeRemoveModal())}
            className="flex-1 py-3 rounded-[2rem] border border-[#E0E0E0] unageo-regular text-[0.875rem] font-medium text-[#333] hover:bg-[#F8F8F8] transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // TODO: call backend DELETE /cards/:id here
              // On success the backend response should trigger removeActiveCard()
              dispatch(removeActiveCard());
            }}
            className="flex-1 py-3 rounded-[2rem] bg-[#C62828] unageo-regular text-[0.875rem] font-medium text-white hover:bg-[#a81f1f] transition-colors duration-200 cursor-pointer"
          >
            Remove
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ── CardFunctions ─────────────────────────────────────────────────────────────
const CardFunctions = () => {
  const dispatch = useAppDispatch();
  const removeModalOpen = useAppSelector((state) => state.card.removeModalOpen);
  const totalCards = useAppSelector((state) => state.card.totalCards);

  return (
    <>
      <div className="flex xl:flex-col w-full xl:w-[7rem] xl:h-full items-center justify-center gap-4 sm:gap-5 md:gap-6 p-1">
        {/* Add new card */}
        <Link
          href="/dashboard/wallet/add-new-card"
          className="flex flex-col justify-center items-center gap-1 sm:gap-1.5 p-2 sm:p-2.5 md:p-3 lg:py-[0.125rem] lg:px-1 rounded-lg bg-[#4CA75008] w-full h-full min-h-[4rem] sm:min-h-[4.5rem] md:min-h-[5rem] hover:opacity-70 transition-all duration-500 ease-in-out"
        >
          <Image
            src="/delivery/wallet/add-card.svg"
            alt="card"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <h4 className="text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-[0.75rem] leading-tight font-medium text-[#4CA750] text-center">
            Add new card
          </h4>
        </Link>

        {/* Edit card — only active when at least one card exists */}
        <div
          onClick={() => totalCards > 0 && dispatch(openEditFunction())}
          className={`flex flex-col justify-center items-center gap-1 sm:gap-1.5 p-2 sm:p-2.5 md:p-3 lg:py-[0.125rem] lg:px-1 rounded-lg bg-[#FE581C08] w-full h-full min-h-[4rem] sm:min-h-[4.5rem] md:min-h-[5rem] transition-all duration-500 ease-in-out ${
            totalCards > 0
              ? "cursor-pointer hover:opacity-70"
              : "opacity-40 cursor-not-allowed"
          }`}
        >
          <Image
            src="/delivery/wallet/edit-card.svg"
            alt="card"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <h4 className="text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-[0.75rem] leading-tight font-medium text-[#FE581C] text-center">
            Edit card
          </h4>
        </div>

        {/* Remove card — only active when at least one card exists */}
        <div
          onClick={() => totalCards > 0 && dispatch(openRemoveModal())}
          className={`flex flex-col justify-center items-center gap-1 sm:gap-1.5 p-2 sm:p-2.5 md:p-3 lg:py-[0.125rem] lg:px-1 rounded-lg bg-[#C6282808] w-full h-full min-h-[4rem] sm:min-h-[4.5rem] md:min-h-[5rem] transition-all duration-500 ease-in-out ${
            totalCards > 0
              ? "cursor-pointer hover:opacity-70"
              : "opacity-40 cursor-not-allowed"
          }`}
        >
          <Image
            src="/delivery/wallet/remove-card.svg"
            alt="card"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <h4 className="text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-[0.75rem] leading-tight font-medium text-[#C62828] text-center">
            Remove card
          </h4>
        </div>
      </div>

      {/* Remove confirmation modal */}
      <AnimatePresence>
        {removeModalOpen && <RemoveCardModal />}
      </AnimatePresence>
    </>
  );
};

export default CardFunctions;