"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface PresentBoxSectionProps {
  onClickNextStepButton: () => void;
  isNextStepButtonClicked: boolean;
}

export const PresentBoxSection = ({
  onClickNextStepButton,
  isNextStepButtonClicked,
}: PresentBoxSectionProps) => {
  const [scaleRatio, setScaleRatio] = useState(1);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    document.body.style.overflow = isNextStepButtonClicked ? "hidden" : "";

    if (isNextStepButtonClicked) {
      const moveTimer = setTimeout(() => setAnimationPhase(1), 100);

      const fadeTimer = setTimeout(() => setAnimationPhase(2), 800);

      return () => {
        clearTimeout(moveTimer);
        clearTimeout(fadeTimer);
        setAnimationPhase(0);
      };
    }
  }, [isNextStepButtonClicked]);

  useEffect(() => {
    const calculateRatio = () => {
      const screenDiagonal = Math.hypot(window.innerWidth, window.innerHeight);
      const cardDiagonal = Math.hypot(274, 399);
      return (screenDiagonal / cardDiagonal) * 1.2;
    };
    const update = () => setScaleRatio(calculateRatio());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const containerVariants = {
    normal: {
      scale: 1,
      borderRadius: 24,
      zIndex: 10,
      backgroundColor: "white",
    },
    expanded: {
      scale: scaleRatio,
      borderRadius: 35,
      zIndex: 999,
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      backgroundColor: "black",
    },
  };

  const contentVariants = {
    normal: { opacity: 1, y: 0 },
    expanded: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const getImageStyle = () => {
    if (animationPhase === 0) {
      return {
        opacity: 1,
        y: 0,
        scale: 1,
      };
    } else if (animationPhase === 1) {
      return {
        opacity: 1,
        y: 70,
        scale: 1.1,
      };
    } else {
      return {
        opacity: 0,
        y: 70,
        scale: 0.6,
      };
    }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="normal"
        animate={isNextStepButtonClicked ? "expanded" : "normal"}
        transition={{
          scale: { type: "spring", stiffness: 100, damping: 10, delay: 0.1 },
          default: { duration: 0 },
        }}
        className="flex flex-col items-center justify-start overflow-hidden rounded-3xl bg-white text-center"
        style={{
          width: 274,
          height: 399,
          transformOrigin: "center center",
          padding: "20px",
        }}
      >
        <div className="mb-6 h-[280px] w-[280px]"></div>

        <motion.div
          variants={contentVariants}
          animate={isNextStepButtonClicked ? "expanded" : "normal"}
          className="w-full"
        >
          <p className="mb-4 font-bold text-black">오늘의 선물 꾸러미</p>
          <Button
            onClick={onClickNextStepButton}
            disabled={isNextStepButtonClicked}
            className="min-h-[48px] w-full rounded-[21px] bg-black py-4 font-bold text-foreground text-xl"
          >
            지금 선물하기
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={getImageStyle()}
        transition={{
          opacity: { duration: 0.8, ease: "easeInOut" },
          y: { type: "spring", stiffness: 70, damping: 13 },
          scale: { duration: 0.5, ease: "easeOut" },
        }}
        style={{
          position: "fixed",
          width: 280,
          height: 280,
          left: "50%",
          marginTop: -140 - (isNextStepButtonClicked ? 0 : 25),
          marginLeft: -140,
          zIndex: isNextStepButtonClicked ? 1000 : 11,
          pointerEvents: "none",
        }}
      >
        <motion.div
          className="relative size-full"
          variants={{
            hidden: { y: 50, opacity: 0.2 },
            visible: { y: 30, opacity: 1 },
          }}
          initial="hidden"
          animate="visible"
          transition={{
            y: {
              duration: 0.4,
              ease: "easeInOut",
              delay: 2,
              type: "spring",
              stiffness: 120,
              damping: 20,
            },
          }}
        >
          <Image
            src="/present.svg"
            alt="선물 이미지"
            fill
            sizes="280px"
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </>
  );
};
