"use client";

import { HydrationBoundary } from "@tanstack/react-query";
import { RecommendationCarousel } from "@/components/recommendation/carousel";

interface RecommendationSectionProps {
  dehydratedState: any;
}

export const RecommendationSection = ({
  dehydratedState,
}: RecommendationSectionProps) => {
  return (
    <div className="w-full overflow-visible">
      <HydrationBoundary state={dehydratedState}>
        <RecommendationCarousel />
      </HydrationBoundary>
    </div>
  );
};
