"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { FlipCard } from "@/components/recommendation/flip-card";
import { Page } from "@/components/shared/page";
import { AVAILABLE_NEXT_PICK_COUNT } from "@/constants/recommendation-result";
import { cn } from "@/lib/utils";
import { ActionButtons } from "./action-buttons";
import { useCardAnimation } from "./hooks/useCardAnimation";
import { useResultToast } from "./hooks/useResultToast";

interface Props {
  name: string;
  items: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[];
}

export const PresentRecommendationResult = ({ name, items }: Props) => {
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

  const item = items[currentIndex];

  const handleNextResult = () => {
    setNextPickCount((prev) => Math.max(0, prev - 1));

    triggerCardTransition(() => {
      if (items && currentIndex < items.length - 1) {
        setCurrentIndex((prev) => (prev + 1) % items.length);
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

      <Page.Title className="desktop:mt-[60px] mt-16px text-gray-100">
        <span className="text-primary-500">{name}</span>
        님이
        <br />
        좋아할 선물을 준비했어요
      </Page.Title>

      <div className="flex flex-1 items-center justify-center">
        {item && (
          <FlipCard
            key={cardKey}
            item={item}
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
