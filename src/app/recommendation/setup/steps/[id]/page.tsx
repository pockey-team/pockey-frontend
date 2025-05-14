"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Back } from "@/components/shared/back";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import { QUESTIONS } from "@/constants/recommendation-setup-questions";
import { RecommendationSetupFormData } from "@/types/recommendation/setup";

export default function RecommendationSetupStepPage() {
  const params = useParams();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setValue } = useFormContext<RecommendationSetupFormData>();

  const id = Number(params.id);
  const steps = QUESTIONS.length;
  const question = QUESTIONS.find((q) => q.id === id);

  const [name, value] = useWatch({ name: ["name", question!.name] });

  if (!question) {
    return redirect("/");
  }

  const handleSelect = async (value: string) => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setValue(question.name, value);
    setTimeout(() => {
      if (id < steps) {
        router.push(`/recommendation/setup/steps/${id + 1}`);
      } else {
        router.push(`/recommendation/setup/when`);
      }
    }, 500);
  };

  return (
    <Page className="bg-gray-800">
      <Page.Header>
        <Page.Header.Left>
          <Back />
        </Page.Header.Left>
        <Page.Header.Right>
          <Link href="/" className="text-body-16-regular text-gray-500">
            닫기
          </Link>
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="mt-[104px]">
        <p className="mb-16px text-center text-gray-500 text-subtitle-18-semibold">
          {id}/{steps}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Page.Title className="text-gray-100">
              {question.title(name)}
            </Page.Title>
          </motion.div>
        </AnimatePresence>
      </Page.Container>

      <Page.Container className="flex flex-grow flex-col justify-center pb-[256px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-16px">
              {question.options.map((option) => (
                <Button
                  key={option.value}
                  size="medium"
                  variant="contained"
                  onClick={() => handleSelect(option.value)}
                  aria-selected={value === option.value}
                  disabled={isTransitioning}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Page.Container>
    </Page>
  );
}
