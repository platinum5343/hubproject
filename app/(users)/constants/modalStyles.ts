export const MODAL_STYLES = {
  boxShadow:
    "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  background: "linear-gradient(135deg, #FDFDFD 0%, #F8F8F8 100%)",
} as const;

export const MODAL_DIMENSIONS = {
  mobile: {
    width: "21.75rem",
    height: "32rem",
  },
  desktop: {
    width: "36rem",
    height: "39rem",
  },
} as const;
