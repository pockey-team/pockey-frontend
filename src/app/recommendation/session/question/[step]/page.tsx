"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecommendSessionControllerSubmitAnswer } from "@/api/__generated__";
import { CloverButtons } from "@/components/recommendation/clover-buttons";
import { QuestionStepper } from "@/components/recommendation/question-stepper";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { PageError } from "@/components/shared/page-error";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { createUrlFromSessionResponse } from "@/utils/recommendation";

type Phase = "init" | "waiting" | "selection" | "exit";

export interface RecommendationSessionQuestionPageQuery {
  name: string;
  sessionId: string;
  question: string;
  options: string[];
}

export default function RecommendationSessionQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>();
  const mutation = useRecommendSessionControllerSubmitAnswer();

  const step = Number(params.step);
  const { name, sessionId, question, options } =
    useSearchParamsObject<RecommendationSessionQuestionPageQuery>({
      hook: (data) => ({ ...data, options: JSON.parse(data.options || "[]") }),
    });
  const currentStep = step - 5;
  const isFirst = currentStep === 1;

  const [phase, setPhase] = useState<Phase>(isFirst ? "init" : "selection");

  useEffect(() => {
    if (!isFirst) {
      return;
    }
    const timeouts = [
      setTimeout(() => setPhase("waiting"), 3_000),
      setTimeout(() => setPhase("selection"), 4_000),
    ];
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [isFirst]);

  if (!name || !sessionId || !question || !options || !options.length) {
    return redirect("/recommendation/init");
  }

  const handleSelect = async (value: string) => {
    if (isLoading || !sessionId) return;

    setSelected(value);
    setIsLoading(true);

    setTimeout(() => setPhase("exit"), 500);

    try {
      const { data } = await mutation.mutateAsync({
        sessionId,
        data: { step, answer: value },
      });

      const url = createUrlFromSessionResponse(data, { name });
      router.push(url);
    } catch (err) {
      console.error("Submit answer error:", err);
      setError("답변을 제출하는데 문제가 발생했습니다.");
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <PageError retry={() => window.location.reload()}>{error}</PageError>
    );
  }

  return (
    <Page className="bg-[linear-gradient(180deg,#030507_0%,#1A2647_100%)]">
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
      <Page.Container className="mt-4">
        <motion.div
          initial={{ y: isFirst ? 30 : 0 }}
          animate={{ y: 0 }}
          transition={{ delay: isFirst ? 3 : 0, duration: 0.5 }}
        >
          <motion.div
            initial={{ y: isFirst ? 20 : 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: isFirst ? 3 : 0,
            }}
            className="mt-[62px] mb-24px"
          >
            <QuestionStepper
              wide={phase === "selection" || phase === "exit"}
              currentStep={currentStep}
              totalSteps={4}
            />
          </motion.div>
        </motion.div>
        <AnimatePresence mode="wait">
          {phase === "init" && <Landing />}
          {phase === "selection" && (
            <>
              <Page.Title
                as={motion.h1}
                initial={{ y: isFirst ? -20 : 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: isFirst ? -20 : 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="!text-heading-22-semibold mb-[54px] text-gray-100"
              >
                {question}
              </Page.Title>
              {options.length === 4 && (
                <CloverButtons
                  options={[
                    {
                      active: !selected,
                      selected: selected === options[0],
                      label: options[0],
                      onClick: () => !isLoading && handleSelect(options[0]),
                    },
                    {
                      active: !selected,
                      selected: selected === options[1],
                      label: options[1],
                      onClick: () => !isLoading && handleSelect(options[1]),
                    },
                    {
                      active: !selected,
                      selected: selected === options[2],
                      label: options[2],
                      onClick: () => !isLoading && handleSelect(options[2]),
                    },
                    {
                      active: !selected,
                      selected: selected === options[3],
                      label: options[3],
                      onClick: () => !isLoading && handleSelect(options[3]),
                    },
                  ]}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </Page.Container>
      <AnimatePresence mode="wait">
        {phase === "init" && <CloverImage />}
      </AnimatePresence>
    </Page>
  );
}

const Landing = () => {
  return (
    <>
      <Page.Title
        as={motion.h1}
        initial={{ y: 65, opacity: 0 }}
        animate={{ y: 30, opacity: 1 }}
        exit={{ y: 65, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12px text-gray-100"
      >
        이제 4개의 질문만 지나면
        <br />딱 맞는 선물을 찾을 수 있어요
      </Page.Title>
      <Page.SubTitle
        as={motion.h2}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 30, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-gray-400"
      >
        진심을 담은 선물을 찾아볼게요
      </Page.SubTitle>
    </>
  );
};

const CloverImage = () => {
  const transitions = {
    animate: { duration: 3, ease: "easeInOut", repeat: Infinity },
    exit: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <Page.Container
      as={motion.div}
      initial={{ y: 100, opacity: 0, scale: 0.75 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -25, 0], transition: transitions.animate }}
        exit={{ y: 200, opacity: 0, transition: transitions.exit }}
        className="mx-auto w-full"
      >
        <Image
          src="/static/images/recommendation-question-clover.png"
          alt="recommendation-question-clover"
          width={352}
          height={352}
        />
      </motion.div>
    </Page.Container>
  );
};
