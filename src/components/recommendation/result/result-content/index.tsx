"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { FlipCard } from "@/components/recommendation/flip-card";
import { SatisfiedButton } from "@/components/recommendation/satisfied-button";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import type { Present } from "@/constants/presents";
import {
  AVAILABLE_NEXT_PICK_COUNT,
  TOAST_STYLE,
} from "@/constants/recommendation-result";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { cn } from "@/lib/utils";
import { getSessionResultStorageKey } from "@/utils/recommendation";

interface ResultResponse {
  result: Present;
  nextPick: Present[];
}

export const ResultContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPickCount, setNextPickCount] = useState(AVAILABLE_NEXT_PICK_COUNT);
  const [showToast, setShowToast] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const [isFloating, setIsFloating] = useState(false);

  const { name, sessionId = "default" } = useSearchParamsObject<{
    name: string;
    sessionId?: string;
  }>();

  const items = JSON.parse(
    window.sessionStorage.getItem(getSessionResultStorageKey(sessionId)) ||
      "[]",
  ) as RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[];

  const item = items[currentIndex];

  const handleNextResult = () => {
    setIsDisappearing(true);
    setNextPickCount((prev) => Math.max(0, prev - 1));

    setTimeout(() => {
      if (items && currentIndex < items.length - 1) {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }

      setTimeout(() => {
        setCardKey((prev) => prev + 1);
        setIsDisappearing(false);
      }, 100);
    }, 500);

    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      toast.success(
        nextPickCount > 0
          ? `결과를 볼 수 있는 기회가 ${nextPickCount}번 남았어요.`
          : "결과를 볼 수 있는 기회가 없어요.",
        {
          duration: 2000,
          id: "next-pick-toast",
          icon: null,
          style: TOAST_STYLE,
        },
      );
      setShowToast(false);
    }
  }, [showToast, nextPickCount]);

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

      <Page.Title className="desktop:mt-[60px]">
        <span className="text-primary-500">포키님이</span>
        <span className="mt-8px block text-white">좋아할 선물을 추천해요</span>
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

      <Page.ActionButton
        as={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeIn",
          delay: 0.9,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      >
        {() => (
          <div className="flex w-full justify-between gap-8px">
            <SatisfiedButton />
            <Button
              disabled={nextPickCount === 0}
              onClick={handleNextResult}
              variant="ghost"
              className="w-1/2 rounded-xl bg-gray-700 py-16px text-gray-500 text-subtitle-18-bold text-xl tracking-tight hover:bg-gray-700 hover:text-gray-500 focus:bg-gray-700 focus:text-gray-500 active:bg-gray-700 active:text-gray-500"
            >
              별로예요
            </Button>
          </div>
        )}
      </Page.ActionButton>
    </div>
  );
};
