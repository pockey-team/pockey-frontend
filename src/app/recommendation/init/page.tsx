"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecommendSessionControllerStartSession } from "@/api/__generated__";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import { PageError } from "@/components/shared/page-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createUrlFromSessionResponse } from "@/utils/recommendation";

type Phase = "active" | "exiting" | "complete";

export default function RecommendationInitPage() {
  const [name, setName] = useState<string>("");
  const [phase, setPhase] = useState<Phase>("active");

  const handleNext = () => {
    setPhase("exiting");
    setTimeout(() => setPhase("complete"), 500);
  };

  if (phase === "active" || phase === "exiting") {
    return (
      <RecommendationInit
        name={name}
        setName={setName}
        phase={phase}
        onNext={handleNext}
      />
    );
  } else if (phase === "complete") {
    return <RecommendationInitComplete name={name} />;
  }
}

interface Props {
  name: string;
  setName: (name: string) => void;
  phase: Phase;
  onNext: () => void;
}

const RecommendationInit = ({ name, setName, phase, onNext }: Props) => {
  const isValid = !!name;

  return (
    <Page
      className={cn(
        "bg-recommendation-setup-name",
        phase === "exiting" && "bg-recommendation-setup-name-animate",
      )}
    >
      <Page.Header>
        <Page.Header.Right>
          <Link href="/" className="text-body-16-regular text-gray-500">
            닫기
          </Link>
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="flex h-full flex-1 flex-col justify-center">
        <AnimatePresence mode="wait">
          {phase === "active" && (
            <Page.Title
              as={motion.h1}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-gray-100"
            >
              누구에게 줄 선물인가요?
            </Page.Title>
          )}
        </AnimatePresence>

        <div className="flex w-full flex-shrink items-center justify-center px-20px py-[28px]">
          <AnimatePresence mode="wait">
            {phase === "active" && <Present21Image />}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {phase === "active" && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: 150,
                opacity: 0,
                transition: {
                  default: { duration: 0.5, ease: "easeOut" },
                  opacity: { duration: 0.4 },
                },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col px-[27px]"
            >
              <Label htmlFor="name">선물 받는 사람</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 지어주세요"
                maxLength={7}
                required
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Page.Container>

      <AnimatePresence mode="wait">
        {phase === "active" && (
          <Page.ActionButton
            as={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-24px"
          >
            {(props) => (
              <Button
                {...props}
                size="x-large"
                disabled={!isValid || phase !== "active"}
                aria-selected={!!isValid}
                onClick={onNext}
              >
                다음
              </Button>
            )}
          </Page.ActionButton>
        )}
      </AnimatePresence>
    </Page>
  );
};

const RecommendationInitComplete = ({ name }: { name: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [innerPhase, setInnerPhase] = useState<Phase>("active");
  const [error, setError] = useState<string | null>(null);

  const mutation = useRecommendSessionControllerStartSession();

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const start = async () => {
      try {
        const { data } = await mutation.mutateAsync({
          data: { deviceId: "0000", receiverName: name },
        });

        if ("sessionId" in data) {
          window.sessionStorage.setItem("pockey.sessionId", data.sessionId);
        }

        setTimeout(() => setInnerPhase("exiting"), 2_000);
        setTimeout(() => {
          const url = createUrlFromSessionResponse(data, { name });
          router.push(url);
        }, 2_500);
      } catch (_err) {
        setError("세션을 시작하는 데 문제가 발생했습니다.");
        setIsLoading(false);
      }
    };

    start();
  }, [name, router, mutation.mutateAsync, isLoading]);

  if (error) {
    return (
      <PageError retry={() => window.location.reload()}>{error}</PageError>
    );
  }

  return (
    <Page className="bg-recommendation-setup-name-complete">
      <Page.Header>
        <Page.Header.Right>
          <Link href="/" className="text-body-16-regular text-gray-500">
            닫기
          </Link>
        </Page.Header.Right>
      </Page.Header>

      <AnimatePresence mode="wait">
        {innerPhase === "active" && (
          <Page.Container
            as={motion.div}
            noPadding={false}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex h-full flex-col justify-center pb-[128px]"
          >
            <Page.Title className="mb-12px text-gray-100">
              <span className="text-primary-500">{name}</span>님을 위한
              <br />
              선물을 찾으시는군요!
            </Page.Title>
            <Page.SubTitle className="text-gray-400">
              어울리는 선물을 지금부터 찾아볼게요
            </Page.SubTitle>
          </Page.Container>
        )}
      </AnimatePresence>
    </Page>
  );
};

const Present21Image = () => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        y: 100,
        opacity: 0,
        transition: {
          default: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.45 },
        },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-shrink flex-col items-center justify-center"
    >
      <div className="absolute h-[180px] w-[180px] rounded-full bg-[#94F2FF]/[.68] blur-[100px]" />
      <div>
        <Image
          src="/static/images/recommendation-present-21.png"
          alt="선물 상자"
          width={632}
          height={631}
          className="relative z-10 h-auto max-h-[40vh] w-full object-contain"
        />
      </div>
    </motion.div>
  );
};
