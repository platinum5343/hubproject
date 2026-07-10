import { easeIn, easeOut } from "framer-motion";

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.5,
      ease: easeIn,
    },
  }),
};

export const imageDepth = {
  hidden: {
    scale: 1.05,
  },
  show: {
    scale: 1,
    transition: {
      duration: 1.2,
      ease: easeOut,
    },
  },
};

export const textStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};
