"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useRecommendSessionControllerSubmitAnswer } from "@/api/__generated__";
import { RecommendationTitle } from "@/components/recommendation/title";
import { Back } from "@/components/shared/back";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import { PageError } from "@/components/shared/page-error";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { createUrlFromSessionResponse } from "@/utils/recommendation";

export interface RecommendationSessionSetupPageQuery {
  name: string;
  sessionId: string;
  question: string;
  options: string[];
}

export default function RecommendationSessionSetupPage() {
  const params = useParams();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const mutation = useRecommendSessionControllerSubmitAnswer();

  const step = Number(params.step);
  const { name, sessionId, question, options } =
    useSearchParamsObject<RecommendationSessionSetupPageQuery>({
      hook: (data) => ({ ...data, options: JSON.parse(data.options || "[]") }),
    });
  const isFirst = step === 1;
  const steps = 4;

  if (!name || !sessionId || !question || !options || !options.length) {
    return redirect("/recommendation/init");
  }

  const handleSelect = async (value: string) => {
    if (isTransitioning || isLoading) {
      return;
    }

    setValue(value);
    setIsLoading(true);
    setIsTransitioning(true);

    try {
      const { data } = await mutation.mutateAsync({
        sessionId,
        data: { step, answer: value },
      });

      setTimeout(() => {
        const url = createUrlFromSessionResponse(data, { name });
        router.push(url);
      }, 500);
    } catch (err) {
      setError("답변을 제출하는데 문제가 발생했습니다.");
      setIsLoading(false);
      setIsTransitioning(false);
    }
  };

  if (error) {
    return (
      <PageError retry={() => window.location.reload()}>{error}</PageError>
    );
  }

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
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={isFirst ? { y: 70 } : { y: 0 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
            className="mb-16px text-center text-gray-500 text-subtitle-18-semibold"
          >
            {step}/{steps}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={isFirst ? { y: 85 } : { y: 0 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
          >
            <Page.Title className="text-gray-100">
              <RecommendationTitle
                name={name || ""}
                text={question}
                component={({ children }) => (
                  <span className="text-primary-500">{children}</span>
                )}
              />
            </Page.Title>
          </motion.div>
        </AnimatePresence>
      </Page.Container>

      <Page.Container className="flex flex-grow flex-col justify-center pb-[256px]">
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 70 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: isFirst ? 0.5 : 0,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{ opacity: 0, y: -70 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-2 gap-16px">
                {options.map((option) => (
                  <Button
                    key={option}
                    size="medium"
                    variant="contained"
                    onClick={() => handleSelect(option)}
                    aria-selected={value === option}
                    disabled={isTransitioning || isLoading}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Page.Container>
    </Page>
  );
}
