import { useEffect, useState } from "react";

/**
 * Custom hook to handle smooth content transitions in modals
 * Delays content change to allow fade out animation
 */
export const useContentTransition = (activeContent: string | null) => {
  const [currentContent, setCurrentContent] = useState(activeContent);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (activeContent && activeContent !== currentContent) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setCurrentContent(activeContent);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [activeContent, currentContent]);

  return { currentContent, isTransitioning, setCurrentContent };
};
