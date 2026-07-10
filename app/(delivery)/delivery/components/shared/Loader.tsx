"use client";
import React from "react";
import { motion } from "framer-motion";

interface PaymentLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const PaymentLoader: React.FC<PaymentLoaderProps> = ({
  message = "Checking Card",
  size = "lg",
}) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circular Loader */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background circle (light) */}
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
            stroke="#FFD4C4"
            strokeWidth="8"
          />
        </svg>

        {/* Animated progress circle (orange) */}
        <svg
          className="absolute top-0 left-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#FE581C"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 283" }}
            animate={{ strokeDasharray: ["0 283", "212 283", "0 283"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[1rem] font-medium text-[#1A1A1A] leading-5"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default PaymentLoader;
