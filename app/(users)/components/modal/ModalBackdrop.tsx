import { motion } from "framer-motion";
import { backdropVariants } from "../../animations/ModalAnimations";

interface ModalBackdropProps {
  onClick: (e: React.MouseEvent) => void;
}

export const ModalBackdrop = ({ onClick }: ModalBackdropProps) => {
  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/50 z-50"
      onClick={onClick}
    />
  );
};
