"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { RecommendationCloseButton } from "@/components/recommendation/close-button";
import { LoginDialog } from "@/components/recommendation/dialog/login";
import { useLoginDialog } from "@/components/recommendation/dialog/login/hooks/useLoginDialog";
import { FlipCard } from "@/components/recommendation/flip-card";
import { ActionButtons } from "@/components/recommendation/result/present-recommendation-result/action-buttons";
import { useCardAnimation } from "@/components/recommendation/result/present-recommendation-result/hooks/useCardAnimation";
import { useResultToast } from "@/components/recommendation/result/present-recommendation-result/hooks/useResultToast";
import { Page } from "@/components/shared/page";
import { AVAILABLE_NEXT_PICK_COUNT } from "@/constants/recommendation-result";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { cn } from "@/lib/utils";
import { getSessionResultStorageKey } from "@/utils/recommendation";

interface Props {
  name: string;
  items: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[];
}

export const PresentRecommendationResult = () => {
  const router = useRouter();
  const { name, sessionId = "default" } = useSearchParamsObject<{
    name: string;
    sessionId?: string;
  }>();

  const items = JSON.parse(
    window.sessionStorage.getItem(getSessionResultStorageKey(sessionId)) ||
      "[]",
  );

  const { isLoginDialogOpen, setIsLoginDialogOpen, isLoggedIn } =
    useLoginDialog();

  // if (!name || !items || !Array.isArray(items)) {
  //   return redirect("/");
  // }

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

  const handleClickProduct = () => {
    if (!isLoggedIn) {
      setIsLoginDialogOpen(true);
    } else {
      router.push(`/recommendation/result/${item.product.id}?name=${name}`);
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      <Page.Header>
        <Page.Header.Right>
          <RecommendationCloseButton callbackTargetResultId={item.product.id} />
        </Page.Header.Right>
      </Page.Header>
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

      <div className="mb-8px flex flex-1 items-center justify-center">
        {item && (
          <div
            onClick={handleClickProduct}
            onKeyDown={handleClickProduct}
            className="cursor-pointer"
          >
            <FlipCard
              key={cardKey}
              item={item}
              flipDelay={500}
              isDisappearing={isDisappearing}
              isFloating={isFloating}
              setIsFloating={setIsFloating}
            />
          </div>
        )}
      </div>

      <ActionButtons
        nextPickCount={nextPickCount}
        onNextResult={handleNextResult}
        itemId={item.product.id}
      />
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        callbackUrl={`/recommendation/result/${item.product.id}?name=${name}`}
      />
    </div>
  );
};
