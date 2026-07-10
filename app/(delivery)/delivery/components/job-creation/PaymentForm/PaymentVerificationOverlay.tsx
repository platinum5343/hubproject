"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PaymentLoader from "../../shared/Loader";
import Image from "next/image";

interface PaymentVerificationOverlayProps {
  onSuccess: () => void;
  onFailure: () => void;
  onClose: () => void;
  simulateSuccess?: boolean; // For testing - true for success, false for failure
}

type VerificationState = "checking" | "success" | "failed";

const PaymentVerificationOverlay: React.FC<PaymentVerificationOverlayProps> = ({
  onSuccess,
  onFailure,
  onClose,
  simulateSuccess = true,
}) => {
  const [verificationState, setVerificationState] =
    useState<VerificationState>("checking");

  useEffect(() => {
    // Simulate API call - checking card funds
    const timer = setTimeout(() => {
      // Randomly decide success or failure (or use simulateSuccess prop)
      const isSuccess = simulateSuccess; // Change to false to test failure

      if (isSuccess) {
        setVerificationState("success");
        // Wait 2 seconds to show success, then proceed
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setVerificationState("failed");
      }
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, [simulateSuccess, onSuccess]);

  const handleFailureClose = () => {
    onFailure();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center"
      onClick={(e) => {
        // Only allow closing on failure state
        if (verificationState === "failed") {
          handleFailureClose();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white rounded-[1.25rem] p-8 max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {verificationState === "checking" && (
            <motion.div
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <PaymentLoader message="Checking Card" size="lg" />
            </motion.div>
          )}

          {verificationState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Success Icon */}
              <div className="relative w-32 h-32">
                {/* Background circle (light green) */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#C8E6C9"
                    strokeWidth="8"
                  />
                </svg>

                {/* Green circle with checkmark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#4CAF50] rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <p className="text-[1rem] font-medium text-[#4CAF50] leading-5">
                Success
              </p>
            </motion.div>
          )}

          {verificationState === "failed" && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Failure Icon */}
              <div className="relative w-32 h-32">
                {/* Background circle (light red) */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FFCDD2"
                    strokeWidth="8"
                  />
                </svg>

                {/* Red circle with X */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#F44336] rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-[1rem] font-medium text-[#F44336] leading-5">
                  Insufficient Funds
                </p>
                <p className="text-[0.875rem] text-[#616161] text-center leading-[1.125rem]">
                  Please fund card or try a different card
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={handleFailureClose}
                className="mt-4 px-8 py-3 bg-[#F44336] text-white rounded-[2rem] font-medium hover:bg-[#D32F2F] transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default PaymentVerificationOverlay;
