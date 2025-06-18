"use client";

import Link from "next/link";
import { FooterSection } from "@/components/landing/footer";
import { GiftCollectionSection } from "@/components/landing/gift-collection";
import { LandingHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero";
import { StepSection } from "@/components/landing/step-section";
import { Button } from "@/components/ui/button";
import { STEPS } from "@/constants/landing";

export const Landing = () => {
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
        <div className="ipad-pro:pb-[42rem] pb-[22rem] sm:pb-[25rem] lg:pb-[4rem] min-[320px]:pb-[15rem] min-[344px]:pb-[32rem] min-[360px]:pb-[20rem] min-[375px]:pb-[14rem] min-[390px]:pb-[22rem] min-[412px]:pb-[24rem] min-[414px]:pb-[22rem] min-[820px]:pb-[33rem]">
          <FooterSection />
        </div>
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
