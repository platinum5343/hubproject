import { motion } from "framer-motion";
import { decorativeGlowVariants } from "../../animations/ModalAnimations"; 

export const ModalDecorative = () => {
  return (
    <>
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-[1rem] bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.125rem] blur opacity-30 pointer-events-none"
        variants={decorativeGlowVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2, duration: 0.4 }}
      />
    </>
  );
};
