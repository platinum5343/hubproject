import { motion } from "framer-motion";
import Image from "next/image";
import { closeButtonVariants } from "../../animations/ModalAnimations";
import CloseButton from "../icons/auth-modal/CloseButton";

interface ModalCloseButtonProps {
  onClose: () => void;
}

export const ModalCloseButton = ({ onClose }: ModalCloseButtonProps) => {
  return (
    <div className="absolute top-4 right-4 z-10">
      <motion.button
        variants={closeButtonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={onClose}
        className="flex items-center justify-center rounded-full cursor-pointer"
        aria-label="Close modal"
      >
        <CloseButton />
      </motion.button>
    </div>
  );
};
