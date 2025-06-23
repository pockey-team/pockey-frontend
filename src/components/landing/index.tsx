"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FooterSection } from "@/components/landing/footer";
import { GiftCollectionSection } from "@/components/landing/gift-collection";
import { LandingHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero";
import { StepSection } from "@/components/landing/step-section";
import { Button } from "@/components/ui/button";
import { STEPS } from "@/constants/landing";

export const Landing = () => {
  const [footerStyles, setFooterStyles] = useState<React.CSSProperties>({
    paddingBottom: "8rem",
    marginBottom: "0",
  });

  useEffect(() => {
    const updateFooterStyles = () => {
      const width = window.innerWidth;
      let paddingBottom = "8rem";
      let marginBottom = "0";

      if (width >= 1920) {
        paddingBottom = "22rem";
      } else if (width >= 1440) {
        paddingBottom = "8rem";
      } else if (width >= 820) {
        paddingBottom = "39rem";
      } else if (width >= 768) {
        paddingBottom = "31rem";
      } else if (width >= 412) {
        paddingBottom = "28rem";
      } else if (width >= 390) {
        paddingBottom = "27rem";
      } else if (width >= 375) {
        paddingBottom = "18rem";
      } else if (width >= 360) {
        paddingBottom = "25rem";
      } else if (width >= 344) {
        paddingBottom = "37rem";
      }

      if (
        (width === 1024 && window.innerHeight === 1366) ||
        (width === 1112 && window.innerHeight === 834) ||
        (width === 1366 && window.innerHeight === 1024) ||
        (width === 834 && window.innerHeight === 1112)
      ) {
        marginBottom = "7rem";
      }

      setFooterStyles({ paddingBottom, marginBottom });
    };

    updateFooterStyles();
    window.addEventListener("resize", updateFooterStyles);
    return () => window.removeEventListener("resize", updateFooterStyles);
  }, []);

  return (
    <div className="h-dvh w-full overflow-y-auto bg-gray-900 text-gray-100">
      <LandingHeader />
      <div className="relative">
        <StickyButton />
        <HeroSection />
        <GiftCollectionSection />
        {STEPS.map((step) => (
          <StepSection
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            image={step.image}
          />
        ))}
        <div style={footerStyles}>
          <FooterSection />
        </div>
        <div />
      </div>
    </div>
  );
};

const StickyButton = () => {
  return (
    <div className="sticky top-[27rem] z-50 flex w-full justify-center md:top-[28rem] lg:top-[32rem]">
      <Button
        asChild
        className="hover:!bg-primary-500/80 !text-gray-900 !z-50 !rounded-lg h-[50px] w-[280px] bg-primary-500 text-subtitle-16-semibold sm:h-[52px] sm:w-[358px]"
      >
        <Link href="/find">선물 찾으러 가기</Link>
      </Button>
    </div>
  );
};
