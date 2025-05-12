"use client";

import { useQuery } from "@tanstack/react-query";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPresents } from "@/api/Present/get-presents";
import { HeaderSection } from "@/components/present-recommendation-content/header-section";
import { PresentBoxSection } from "@/components/present-recommendation-content/present-box-section";
import { RecommendationSection } from "@/components/present-recommendation-content/recommendation-section";

export const PresentRecommendationContent = () => {
  const { data: presents } = useQuery({
    queryKey: ["presents"],
    queryFn: () =>
      getPresents({
        delay: 1000,
        empty: true,
        error: false,
      }),
  });

  const hasPresents = presents && presents.length > 0;

  const [animationState, setAnimationState] = useState<"initial" | "animating">(
    "initial",
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState("animating");
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const isAnimating = animationState === "animating";
  const cloverControl = useAnimation();

  useEffect(() => {
    const animateSequence = async () => {
      await cloverControl.start({
        scale: 3,
        x: -180,
        y: -150,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.8,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

      await cloverControl.start({
        y: -190,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    };

    animateSequence();
  }, [cloverControl]);

  return (
    <div className="relative flex h-full flex-col">
      <motion.div
        initial={{ scale: 8, x: 0, y: 0, opacity: 0 }}
        animate={cloverControl}
        className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2"
      >
        <Image
          src="/background-clover.png"
          alt="background-clover"
          width={100}
          height={100}
          priority
        />
      </motion.div>

      <motion.div
        initial={{ scale: 8, x: 0, y: 0, opacity: 0 }}
        animate={{ scale: 3, x: 150, y: 150, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.8,
        }}
        className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2"
      >
        <Image
          src="/background-clover.png"
          alt="background-clover"
          width={100}
          height={100}
          priority
        />
      </motion.div>

      {!hasPresents && <HeaderSection isAnimating={isAnimating} />}

      <motion.div
        className="flex min-h-[50vh] flex-1 items-center justify-center overflow-y-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={{
          opacity: isAnimating ? 1 : 0,
          y: isAnimating ? 0 : 60,
        }}
        transition={{
          duration: 1,
          delay: 1.2,
          type: "spring",
          damping: 24,
          stiffness: 100,
        }}
      >
        {hasPresents ? <RecommendationSection /> : <PresentBoxSection />}
      </motion.div>
    </div>
  );
};
