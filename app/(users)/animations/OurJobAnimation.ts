import { easeOut } from "framer-motion";

export const cardHover = {
  initial: {
    y: 0,
    boxShadow: "0px 6px 18px rgba(0,0,0,0.06)",
  },
  hover: {
    y: -8,
    boxShadow: "0px 18px 40px rgba(0,0,0,0.12)",
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export const imageHover = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export const overlayHover = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export const textHover = {
  initial: {
    y: 0,
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};
