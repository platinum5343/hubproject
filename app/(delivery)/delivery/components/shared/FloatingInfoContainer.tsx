"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FloatingInfoContainerProps {
  children: React.ReactNode;
  show?: boolean;
}

const FloatingInfoContainer = ({ children }: FloatingInfoContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute top-[2rem] inset-0 md:flex justify-center hidden h-[6rem] w-[32rem] mx-auto"
    >
      <div className="bg-white py-3 px-4 justify-between items-center rounded-[1.25rem] w-[32rem] h-[5.5rem]">
        {children}
      </div>
    </motion.div>
  );
};

export default FloatingInfoContainer;
