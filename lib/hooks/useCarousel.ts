/* The carousel hook will be able to:

- Manages the current slide index
- Navigates to next and previous slides
- Auto-advances slides after set interval
- Pauses auto-advance on user interaction
- Slides should slide in from right to left and vice versa
- Loops back to first slide after last slide and vice versa with smooth animations
- Listen to key press left and right arrows to navigate slides

*/

import { useState, useRef, useEffect, useCallback } from "react";

const useCarousel = (totalSlides: number, autoAdvanceInterval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    },
    [goToNext, goToPrevious]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentIndex(index);
      }
    },
    [totalSlides]
  );

  // useCallback to memoize autoAdvance function to prevent the functions from being recreated on every render
  const autoAdvance = useCallback(() => {
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(goToNext, autoAdvanceInterval);
  }, [goToNext, autoAdvanceInterval]);

  const stopAutoAdvance = useCallback(() => {
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // cleanup auto advance on unmount
  useEffect(() => {
    return () => stopAutoAdvance();
  }, []);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    autoAdvance,
    stopAutoAdvance,
  };
};

export default useCarousel;
