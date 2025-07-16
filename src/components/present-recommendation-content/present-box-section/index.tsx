"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

interface Props {
  onClickNextStepButton: () => void;
  isNextStepButtonClicked: boolean;
}

export const PresentBoxSection = ({
  onClickNextStepButton,
  isNextStepButtonClicked,
}: Props) => {
  const handleGiftRecommendationClick = () => {
    sendGAEvent("event", "start_recommendation_click", {
      source: "main",
      button_text: "지금 선물하기",
    });
    onClickNextStepButton();
  };

  return (
    <div className="relative flex h-full flex-col">
      {isNextStepButtonClicked ? (
        <div>
          <div className="fixed inset-0px z-50 mb-4px flex items-center justify-center">
            <motion.div
              initial="initial"
              animate="scaleDown"
              variants={{
                initial: {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                },
                moveDown: {
                  y: 30,
                  opacity: 0.7,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 120,
                    damping: 40,
                  },
                },
                scaleDown: {
                  y: 40,
                  opacity: 0.7,
                  scale: 0,
                  transition: {
                    scale: {
                      delay: 0.9,
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                    y: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  },
                },
              }}
            >
              <Image
                src="/present.svg"
                alt="선물이미지"
                width={283}
                height={283}
                className="select-none"
              />
            </motion.div>
          </div>
          <motion.div
            className="pointer-events-none fixed inset-0px z-30 bg-gray-900"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
          />
        </div>
      ) : (
        <div className="z-50 flex h-[23.188rem] w-[17.688rem] flex-col items-center justify-center rounded-3xl bg-white px-[1.3438rem] py-[1.5rem]">
          <motion.div
            initial={{
              y: 40,
              opacity: 0.6,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 2,
              duration: 1,
              ease: "easeInOut",
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
          >
            <Image
              src="/present.svg"
              alt="선물이미지"
              width={283}
              height={283}
              className="select-none"
            />
          </motion.div>
          <p className="pb-[1.25rem]">오늘 준비할 선물 꾸러미</p>
          <Button
            onClick={handleGiftRecommendationClick}
            className={cn(
              "!rounded-xl w-full py-[.8125rem] text-subtitle-16-semibold",
              "scale-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
            )}
            disabled={isNextStepButtonClicked}
          >
            지금 선물하기
          </Button>
        </div>
      )}
    </div>
  );
};
