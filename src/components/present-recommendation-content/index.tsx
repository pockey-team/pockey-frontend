"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
        empty: false,
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

  return (
    <div className="relative flex h-full flex-col">
      <motion.div
        initial={{ y: -150 }}
        animate={{ y: isAnimating ? 150 : -150 }}
        transition={{
          duration: 1.2,
          type: "spring",
          damping: 20,
          stiffness: 80,
        }}
        className="-left-16px pointer-events-none absolute top-0px z-0 h-full w-full"
      >
        <Image
          src="/background-cloud.svg"
          alt="background-cloud"
          fill
          className="object-cover"
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
          delay: 0.3,
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
