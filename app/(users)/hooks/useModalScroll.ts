import { useEffect } from "react";

/**
 * Custom hook to disable body scroll when modal is open
 * Preserves scroll position and restores it when modal closes
 */
export const useModalScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      // Disable body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Cleanup: restore scroll when modal closes
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
};
