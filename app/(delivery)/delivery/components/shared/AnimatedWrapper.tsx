// components/shared/AnimatedWrapper.tsx
"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  show: boolean;
  type?: "desktop" | "mobile";
}

const AnimatedWrapper = ({
  children,
  show,
  type = "desktop",
}: AnimatedWrapperProps) => {
  // Desktop animation - slide in from right
  const desktopVariants: Variants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.5,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Mobile animation - slide up using transform only
  const mobileVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 50,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  const variants = type === "desktop" ? desktopVariants : mobileVariants;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className={type === "mobile" ? "md:hidden h-full" : "h-full"}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedWrapper;
