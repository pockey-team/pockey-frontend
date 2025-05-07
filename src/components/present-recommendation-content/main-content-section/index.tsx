"use client";

import { motion } from "framer-motion";
import { PresentBoxSection } from "../present-box-section";
import { RecommendationSection } from "../recommendation-section";

interface MainContentSectionProps {
  hasPresents: boolean;
  isAnimating: boolean;
  dehydratedState: any;
}

export const MainContentSection = ({
  hasPresents,
  isAnimating,
  dehydratedState,
}: MainContentSectionProps) => {
  return (
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
  );
};
