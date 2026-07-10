"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../../../(users)/store/hooks";
import {
  setPaymentMethod,
  setPaymentVerified,
  closeCardOverlay,
} from "@/app/(delivery)/delivery/store/mapSlice";
import { AnimatePresence } from "framer-motion";
import CheckingCard from "./CheckingCard";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFailed";
import SelectPayment from "./SelectPayment";

interface LinkedCardsOverlayProps {
  onClose: () => void;
  hasCards: boolean;
}

type VerificationState = "selecting" | "checking" | "success" | "failed";

const HasCards = ({ onClose, hasCards }: LinkedCardsOverlayProps) => {
  const dispatch = useAppDispatch();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [verificationState, setVerificationState] =
    useState<VerificationState>("selecting");
  const [simulateSuccess, setSimulateSuccess] = useState(true); // For testing

  const handleCardSelect = (cardId: number) => {
    setSelectedCardId(cardId);
  };

  const handleContinue = () => {
    if (selectedCardId === null && hasCards) return;

    // Set payment method
    dispatch(setPaymentMethod("wallet"));

    // Start verification process
    setVerificationState("checking");
  };

  // Handle payment verification
  useEffect(() => {
    if (verificationState === "checking") {
      // Simulate API call - checking card funds
      const timer = setTimeout(() => {
        // Randomly decide success or failure (or use simulateSuccess prop)
        const isSuccess = simulateSuccess; // Toggle this to test

        if (isSuccess) {
          setVerificationState("success");
          // Wait 2 seconds to show success, then proceed
          setTimeout(() => {
            dispatch(setPaymentVerified(true));
            dispatch(closeCardOverlay());
          }, 2000);
        } else {
          setVerificationState("failed");
        }
      }, 5000); // 3 seconds loading time

      return () => clearTimeout(timer);
    }
  }, [verificationState, simulateSuccess, dispatch]);

  const handleRetry = () => {
    setVerificationState("selecting");
    setSelectedCardId(null);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Card Selection View */}
        {verificationState === "selecting" && (
          <SelectPayment
            simulateSuccess={simulateSuccess}
            setSimulateSuccess={setSimulateSuccess}
            selectedCardId={selectedCardId}
            handleCardSelect={handleCardSelect}
            handleContinue={handleContinue}
          />
        )}

        {/* Checking State */}
        {verificationState === "checking" && <CheckingCard />}

        {/* Success State */}
        {verificationState === "success" && <PaymentSuccess />}

        {/* Failed State */}
        {verificationState === "failed" && (
          <PaymentFailed handleRetry={handleRetry} />
        )}
      </AnimatePresence>
    </>
  );
};

export default HasCards;