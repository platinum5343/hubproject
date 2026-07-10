// components/shared/StepTransition.tsx
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepTransitionProps {
  children: ReactNode;
  stepKey: number | string; // Unique key for each step
}

const StepTransition = ({ children, stepKey }: StepTransitionProps) => {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default StepTransition;
