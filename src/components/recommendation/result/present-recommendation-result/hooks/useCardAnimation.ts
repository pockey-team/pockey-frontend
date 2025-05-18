import { useState } from "react";

export const useCardAnimation = () => {
  const [cardKey, setCardKey] = useState(0);
  const [isFloating, setIsFloating] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

  const triggerCardTransition = (callback: () => void) => {
    setIsDisappearing(true);

    setTimeout(() => {
      callback();

      setTimeout(() => {
        setCardKey((prev) => prev + 1);
        setIsDisappearing(false);
      }, 100);
    }, 500);
  };

  return {
    isDisappearing,
    cardKey,
    isFloating,
    setIsFloating,
    triggerCardTransition,
  };
};
