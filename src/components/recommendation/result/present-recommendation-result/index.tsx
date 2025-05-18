"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { getResult } from "@/api/recommendation/result/get-result";
import { FlipCard } from "@/components/recommendation/flip-card";
import type { Present } from "@/constants/presents";
import { AVAILABLE_NEXT_PICK_COUNT } from "@/constants/recommendation-result";
import { cn } from "@/lib/utils";
import { ActionButtons } from "./action-buttons";
import { useCardAnimation } from "./hooks/useCardAnimation";
import { useResultToast } from "./hooks/useResultToast";
import { TitleSection } from "./title-section";

interface ResultResponse {
  result: Present;
  nextPick: Present[];
}

export const PresentRecommendationResult = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPickCount, setNextPickCount] = useState(AVAILABLE_NEXT_PICK_COUNT);

  const {
    isDisappearing,
    cardKey,
    isFloating,
    setIsFloating,
    triggerCardTransition,
  } = useCardAnimation();

  const { triggerToast } = useResultToast(nextPickCount);

  // TODO.선물 추천 API 연동
  const { data: resultPresents } = useQuery<ResultResponse[]>({
    queryKey: ["presents", "recommendation", "result"],
    queryFn: getResult,
  });

  const displayPresent = resultPresents?.[currentIndex]?.result;

  const handleNextResult = () => {
    setNextPickCount((prev) => Math.max(0, prev - 1));

    triggerCardTransition(() => {
      if (resultPresents && currentIndex < resultPresents.length - 1) {
        setCurrentIndex((prev) => (prev + 1) % resultPresents.length);
      }
    });
    triggerToast();
  };

  return (
    <div className="relative flex h-full flex-col">
      {/* 카드 flip 될 때 overlay */}
      <motion.div
        className={cn(
          "fixed inset-0px bg-gray-900/95 backdrop-blur-md",
          isFloating ? "pointer-events-auto touch-none" : "hidden",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.1 }}
      />

      <TitleSection />

      <div className="flex flex-1 items-center justify-center">
        {displayPresent && (
          <FlipCard
            key={cardKey}
            cardContent={displayPresent}
            flipDelay={500}
            isDisappearing={isDisappearing}
            isFloating={isFloating}
            setIsFloating={setIsFloating}
          />
        )}
      </div>

      <ActionButtons
        nextPickCount={nextPickCount}
        onNextResult={handleNextResult}
      />
    </div>
  );
};
