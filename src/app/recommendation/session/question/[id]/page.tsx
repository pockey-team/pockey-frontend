"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CloverButtons } from "@/components/recommendation/clover-buttons";
import { QuestionStepper } from "@/components/recommendation/question-stepper";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";

type Phase = "init" | "waiting" | "selection";

export default function RecommendationSessionQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const [phase, setPhase] = useState<Phase>("init");

  const currentStep = Number(params.id) - 5;
  const isFirst = currentStep === 1;
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setPhase("waiting"), 3_000),
      setTimeout(() => setPhase("selection"), 4_000),
    ];
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, []);

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
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0, transition: { delay: 3 } }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-[62px] mb-24px transition-spacing duration-500"
          >
            <QuestionStepper
              wide={phase === "selection"}
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
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-[54px] text-gray-100 text-heading-20-semibold"
              >
                상대를 하나의 단어로 표현한다면?
              </Page.Title>
              <CloverButtons
                options={[
                  {
                    active: selected === 1,
                    label: "따뜻하고 열정적이에요",
                    onClick: () => setSelected(1),
                  },
                  {
                    active: selected === 2,
                    label: "섬세하고 트렌디해요",
                    onClick: () => setSelected(2),
                  },
                  {
                    active: selected === 3,
                    label: "귀엽고 한편으론 시크해요",
                    onClick: () => setSelected(3),
                  },
                  {
                    active: selected === 4,
                    label: "차분하고 꼼꼼해요",
                    onClick: () => setSelected(4),
                  },
                ]}
              />
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
