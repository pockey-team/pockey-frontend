"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/shared/button";

const CARD_WIDTH = 274;
const CARD_HEIGHT = 399;
const CARD_BORDER_RADIUS = 24;
const IMAGE_CONTAINER_SIZE = 280;
const IMAGE_INITIAL_Y_OFFSET = 25;

const ANIMATION_STATE = {
  INITIAL: 0,
  MOVE_UP: 1,
  FADE_OUT: 2,
};

const ANIMATION_TIMING = {
  MOVE_DELAY: 100, // ms
  FADE_DELAY: 800,
  CONTENT_FADE_DURATION: 0.3,
  IMAGE_OPACITY_DURATION: 0.8,
  IMAGE_SCALE_DURATION: 0.5,
  Y_SPRING_STIFFNESS: 70,
  Y_SPRING_DAMPING: 13,
};

interface PresentBoxSectionProps {
  onClickNextStepButton: () => void;
  isNextStepButtonClicked: boolean;
  isMobile: boolean;
}

export const PresentBoxSection = ({
  onClickNextStepButton,
  isNextStepButtonClicked,
  isMobile,
}: PresentBoxSectionProps) => {
  const [scaleRatio, setScaleRatio] = useState(1);
  const [imageAnimationStage, setImageAnimationStage] = useState(
    ANIMATION_STATE.INITIAL,
  );

  useEffect(() => {
    document.body.style.overflow = isNextStepButtonClicked ? "hidden" : "";

    if (isNextStepButtonClicked) {
      const moveTimer = setTimeout(
        () => setImageAnimationStage(ANIMATION_STATE.MOVE_UP),
        ANIMATION_TIMING.MOVE_DELAY,
      );
      const fadeTimer = setTimeout(
        () => setImageAnimationStage(ANIMATION_STATE.FADE_OUT),
        ANIMATION_TIMING.FADE_DELAY,
      );

      return () => {
        clearTimeout(moveTimer);
        clearTimeout(fadeTimer);
        setImageAnimationStage(ANIMATION_STATE.INITIAL);
      };
    }
  }, [isNextStepButtonClicked]);

  useEffect(() => {
    const calculateRatio = () => {
      const screenDiagonal = Math.hypot(window.innerWidth, window.innerHeight);
      const cardDiagonal = Math.hypot(CARD_WIDTH, CARD_HEIGHT);
      return (screenDiagonal / cardDiagonal) * 1.2;
    };

    const updateScaleRatio = () => setScaleRatio(calculateRatio());

    updateScaleRatio();
    window.addEventListener("resize", updateScaleRatio);
    return () => window.removeEventListener("resize", updateScaleRatio);
  }, []);

  const mobileExpandedStyles = {
    scale: scaleRatio,
    borderRadius: 35,
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
  };

  const desktopExpandedStyles = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    scale: 1,
    borderRadius: 0,
    x: 0,
    y: 0,
  };

  const containerVariants = {
    normal: {
      scale: 1,
      borderRadius: CARD_BORDER_RADIUS,
      zIndex: 10,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    expanded: {
      ...(isMobile ? mobileExpandedStyles : desktopExpandedStyles),
      zIndex: 999,
      backgroundColor: "black",
    },
  };

  const contentVariants = {
    normal: { opacity: 1, y: 0 },
    expanded: {
      opacity: 0,
      y: 20,
      transition: { duration: ANIMATION_TIMING.CONTENT_FADE_DURATION },
    },
  };

  const getImageAnimationStyles = () => {
    switch (imageAnimationStage) {
      case ANIMATION_STATE.MOVE_UP:
        return { opacity: 1, y: 70, scale: 1.1 };
      case ANIMATION_STATE.FADE_OUT:
        return { opacity: 0, y: 70, scale: 0.6 };
      default:
        return { opacity: 1, y: 0, scale: 1 };
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
        className="flex flex-col items-center justify-start overflow-hidden text-center"
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          transformOrigin: "center center",
          padding: "20px",
        }}
      >
        <div
          style={{
            height: `${IMAGE_CONTAINER_SIZE}px`,
            width: `${IMAGE_CONTAINER_SIZE}px`,
          }}
          className="mb-12px"
        />

        <motion.div
          variants={contentVariants}
          animate={isNextStepButtonClicked ? "expanded" : "normal"}
          className="w-full"
        >
          <p className="mb-[18px] text-body-16-bold text-gray-600">
            오늘의 선물 꾸러미
          </p>
          <Button
            size="large"
            className="w-full"
            onClick={onClickNextStepButton}
            disabled={isNextStepButtonClicked}
          >
            <span className="text-gray-100">지금 선물하기</span>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={getImageAnimationStyles()}
        transition={{
          opacity: {
            duration: ANIMATION_TIMING.IMAGE_OPACITY_DURATION,
            ease: "easeInOut",
          },
          y: {
            type: "spring",
            stiffness: ANIMATION_TIMING.Y_SPRING_STIFFNESS,
            damping: ANIMATION_TIMING.Y_SPRING_DAMPING,
          },
          scale: {
            duration: ANIMATION_TIMING.IMAGE_SCALE_DURATION,
            ease: "easeOut",
          },
        }}
        style={{
          position: "fixed",
          width: IMAGE_CONTAINER_SIZE,
          height: IMAGE_CONTAINER_SIZE,
          left: "50%",
          marginTop:
            -IMAGE_CONTAINER_SIZE / 2 -
            (isNextStepButtonClicked ? 0 : IMAGE_INITIAL_Y_OFFSET),
          marginLeft: -IMAGE_CONTAINER_SIZE / 2,
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
            sizes={`${IMAGE_CONTAINER_SIZE}px`}
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </>
  );
};
