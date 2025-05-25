"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  wide: boolean;
  currentStep: number;
  totalSteps: number;
}

export const QuestionStepper = ({ wide, currentStep, totalSteps }: Props) => {
  return (
    <div className="flex w-full items-center justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const highlighted = step <= currentStep;

        return (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                "flex h-24px w-24px items-center justify-center rounded-full border transition-colors",
                highlighted
                  ? "border-transparent bg-primary-500"
                  : "border-gray-500 bg-transparent",
              )}
            >
              {highlighted ? (
                <span className="text-body-14-medium text-gray-800">
                  {step}
                </span>
              ) : (
                <Image
                  src="/static/images/recommendation-question-stepper-check.svg"
                  alt="Completed"
                  width={8}
                  height={6}
                  className="text-gray-400"
                />
              )}
            </div>

            {step < totalSteps && (
              <div
                className={cn(
                  "h-[1.4px] w-[22px] transition-spacing duration-500",
                  wide ? "mx-8px" : "mx-0px",
                  step < currentStep ? "bg-primary-500" : "bg-gray-600",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
