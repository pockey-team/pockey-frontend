"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useRecommendSessionControllerSubmitAnswer } from "@/api/__generated__";
import { RecommendationTitle } from "@/components/recommendation/title";
import { Back } from "@/components/shared/back";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import { PageError } from "@/components/shared/page-error";
import { occasionOptions } from "@/constants/recommendation-session-occasion-options";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { cn } from "@/lib/utils";
import { createUrlFromSessionResponse } from "@/utils/recommendation";

type Phase = "init" | "selection";

interface OccasionOption {
  key: string;
  title: string;
  description: string;
}

export interface RecommendationSessionOccasionPageQuery {
  name: string;
  sessionId: string;
  question: string;
  options: OccasionOption[];
  description: string;
}

export default function RecommendationSessionOccasionPage() {
  const [phase, setPhase] = useState<Phase>("init");

  const { name, sessionId, question, options, description } =
    useSearchParamsObject<RecommendationSessionOccasionPageQuery>({
      hook: (data) => ({ ...data, options: JSON.parse(data.options || "[]") }),
    });

  useEffect(() => {
    const timeout = setTimeout(() => setPhase("selection"), 1_500);
    return () => clearTimeout(timeout);
  }, []);

  if (
    !name ||
    !sessionId ||
    !question ||
    !options ||
    !options.length ||
    !description
  ) {
    return redirect("/recommendation/init");
  }

  return (
    <Page className="bg-gray-900">
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

      <AnimatePresence mode="wait">
        {phase === "init" && (
          <RecommendationSessionOccasion
            name={name}
            question={question}
            description={description}
          />
        )}
        {phase === "selection" && (
          <RecommendationSessionOccasionSelection
            name={name}
            sessionId={sessionId}
            options={options}
          />
        )}
      </AnimatePresence>
    </Page>
  );
}

interface RecommendationSessionOccasionProps {
  name: string;
  question: string;
  description: string;
}

const RecommendationSessionOccasion = ({
  name,
  question,
  description,
}: RecommendationSessionOccasionProps) => {
  return (
    <Page.Container
      as={motion.div}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mt-[38px]"
    >
      <motion.div
        initial={{ y: 250 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.75, ease: "easeInOut" }}
        className="relative flex flex-shrink flex-col items-center justify-center"
      >
        <Page.Title className="z-10 mb-12px text-gray-100">
          <RecommendationTitle
            component={({ children }) => (
              <span className="text-primary-500">{children}</span>
            )}
            name={name}
            text={question}
          />
        </Page.Title>
        <Page.SubTitle className="z-10 text-gray-400">
          {description}
        </Page.SubTitle>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="absolute h-[180px] w-[180px] rounded-full bg-[#6B22C9]/[.68] blur-[100px]"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        className="flex flex-grow items-center justify-center"
      >
        <Image
          src="/static/images/recommendation-when-thankyou-full.png"
          alt="recommendation-when-thankyou-full"
          width={390}
          height={390}
          className="max-h-[50vh] w-full object-contain"
        />
      </motion.div>
    </Page.Container>
  );
};

interface RecommendationSessionOccasionSelectionProps {
  name: string;
  sessionId: string;
  options: OccasionOption[];
}

const useOccasionOptions = (options: OccasionOption[]) => {
  const [key, setKey] = useState<string>("");
  const option = useMemo(() => {
    const opt = options.find((option) => key === option.key);
    return opt && occasionOptions[key]
      ? { ...opt, ...occasionOptions[key] }
      : null;
  }, [key, options]);

  return { setKey, option };
};

const RecommendationSessionOccasionSelection = ({
  name,
  sessionId,
  options,
}: RecommendationSessionOccasionSelectionProps) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setKey, option } = useOccasionOptions(options);
  const mutation = useRecommendSessionControllerSubmitAnswer();

  const step = Number(params.step);
  const optionOrDefault = option || {
    ...options[0],
    ...occasionOptions[options[0].key],
  };

  const handleNext = async () => {
    if (isLoading || !option) {
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await mutation.mutateAsync({
        sessionId,
        data: { step, answer: option.title },
      });

      setTimeout(() => {
        const url = createUrlFromSessionResponse(data, { name });
        router.push(url);
      }, 500);
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
    <>
      <Page.Container
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mt-[17px]"
      >
        <Page.Title className="text-gray-100">
          <RecommendationTitle
            name={name}
            text={optionOrDefault.description}
            component={({ children }) => (
              <span className="text-primary-500">{children}</span>
            )}
          />
        </Page.Title>
      </Page.Container>
      <Page.Container
        as={motion.div}
        noPadding
        className={cn(
          "flex h-full items-center justify-center",
          optionOrDefault.bg,
        )}
      >
        <optionOrDefault.image />
      </Page.Container>
      <Page.Container as={motion.div} noPadding className="mt-auto w-full">
        <div className="no-scrollbar overflow-x-auto">
          <div className="flex w-max gap-[18px] px-16px py-[30px]">
            {options.map((opt) => (
              <Option
                key={opt.key}
                active={option?.key === opt.key}
                onClick={() => setKey(opt.key)}
                option={{
                  key: opt.key,
                  buttonImageUrl: occasionOptions[opt.key]?.buttonImageUrl,
                  label: opt.title,
                }}
              />
            ))}
          </div>
        </div>
      </Page.Container>
      <Page.ActionButton className="!mt-0px">
        {(props) => (
          <Button
            {...props}
            size="x-large"
            disabled={isLoading}
            aria-selected={!!option?.key}
            onClick={handleNext}
            className="w-full"
          >
            다음
          </Button>
        )}
      </Page.ActionButton>
    </>
  );
};

interface OptionDisplayProps {
  key: string;
  buttonImageUrl: string;
  label: string;
}

const Option = ({
  active,
  onClick,
  option,
}: {
  active: boolean;
  onClick: () => void;
  option: OptionDisplayProps;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center"
    >
      <div
        className={cn(
          "mb-12px h-[88px] w-[88px] rounded-[10px] border bg-gray-700 transition-colors",
          active ? "border-primary-500" : "border-transparent",
        )}
      >
        <Image
          src={option.buttonImageUrl}
          alt={option.key}
          width={88}
          height={88}
          className="object-contain"
        />
      </div>
      <p
        className={cn(
          "text-body-14-semibol transition-colors",
          active ? "text-gray-100" : "text-gray-400",
        )}
      >
        {option.label}
      </p>
    </button>
  );
};
