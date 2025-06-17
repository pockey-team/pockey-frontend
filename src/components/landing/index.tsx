import { FooterSection } from "@/components/landing/footer";
import { GiftCollectionSection } from "@/components/landing/gift-collection";
import { LandingHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero";
import { StepSection } from "@/components/landing/step-section";
import { STEPS } from "@/constants/landing";

export const Landing = () => {
  return (
    <div className="h-screen w-full bg-gray-900 text-gray-100">
      <LandingHeader />
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
      <FooterSection />
    </div>
  );
};
