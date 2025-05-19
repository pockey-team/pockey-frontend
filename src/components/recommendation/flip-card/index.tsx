"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { RecommendationCard } from "@/components/recommendation/card";
import { cn } from "@/lib/utils";

interface Props {
  item: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem;
  flipDelay?: number;
  isDisappearing?: boolean;
  isFloating: boolean;
  setIsFloating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FlipCard = ({
  item,
  flipDelay = 1000,
  isDisappearing = false,
  isFloating = false,
  setIsFloating,
}: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnimatedInitially, setHasAnimatedInitially] = useState(false);

  useEffect(() => {
    if (!hasAnimatedInitially) {
      setIsFloating(true);
      setHasAnimatedInitially(true);
    }
  }, [hasAnimatedInitially, setIsFloating]);

  useEffect(() => {
    if (isDisappearing) {
      setIsFlipped(false);
      setIsFloating(true);
    }
  }, [isDisappearing, setIsFloating]);

  useEffect(() => {
    if (!isDisappearing) {
      const timer = setTimeout(() => {
        setIsFlipped(true);

        setTimeout(() => {
          setIsFloating(false);
        }, 300);
      }, flipDelay);

      return () => clearTimeout(timer);
    }
  }, [flipDelay, isDisappearing, setIsFloating]);

  return (
    <div className="perspective-1000px relative z-50 h-[424px] w-[292px]">
      <motion.div
        className={cn("size-full", isDisappearing && "absolute")}
        initial={{
          y: 100,
          opacity: 0,
          scale: 0.95,
          rotateY: "-18deg",
          rotateX: "-25deg",
          rotateZ: "-12deg",
        }}
        animate={{
          y: isDisappearing ? 200 : isFloating ? -70 : 0,
          rotateZ: isDisappearing ? "-8deg" : isFloating ? "-8deg" : "0deg",
          rotateX: isDisappearing ? "-10deg" : isFloating ? "-10deg" : "0deg",
          rotateY: isDisappearing ? "5deg" : isFloating ? "5deg" : "0deg",
          opacity: isDisappearing ? 0 : 1,
          scale: isDisappearing ? 0.9 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          y: { duration: isDisappearing ? 0.5 : isFloating ? 0.7 : 0.6 },
          opacity: { duration: isDisappearing ? 0.3 : 0.7 },
          scale: { duration: isDisappearing ? 0.3 : 0.5 },
          rotateZ: { duration: isFloating ? 0.7 : 0.6 },
          rotateX: { duration: isFloating ? 0.7 : 0.6 },
          rotateY: { duration: isFloating ? 0.7 : 0.6 },
        }}
      >
        <motion.div
          className="transform-3d preserve-3d relative size-full"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isFlipped && !isDisappearing ? 0 : 180 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {/* 앞면 */}
          <div className="backface-hidden absolute size-full rotate-0">
            <RecommendationCard
              item={item}
              isCurrent
              isResult
              className="bg-gradient-card"
            />
          </div>

          {/* 뒷면 */}
          <div
            className="backface-hidden absolute flex size-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-card bg-white shadow-xl"
            style={{
              transform: "rotateY(180deg)",
            }}
          >
            <div className="absolute top-[10%] left-[10%] size-80% rounded-12px bg-gradient-card opacity-50 shadow-xl" />
            <div className="absolute top-[30%] h-2px w-[50%] bg-gradient-card" />
            <div className="absolute top-[70%] h-1px w-[50%] bg-gradient-card" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
