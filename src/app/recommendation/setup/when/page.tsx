"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Back } from "@/components/shared/back";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import {
  OPTIONS,
  RecommendationSetupWhenOption,
} from "@/constants/recommendation-setup-when-options";
import { cn } from "@/lib/utils";
import { RecommendationSetupFormData } from "@/types/recommendation/setup";

type Phase = "init" | "selection";

export default function RecommendationSetupWhenPage() {
  const [phase, setPhase] = useState<Phase>("init");
  const name = useWatch<RecommendationSetupFormData>({
    name: "name",
  });

  useEffect(() => {
    const timeout = setTimeout(() => setPhase("selection"), 1_500);
    return () => clearTimeout(timeout);
  }, []);

  if (!name) {
    return redirect("/recommendation/setup/name");
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
        {phase === "init" && <RecommendationSetupWhen />}
        {phase === "selection" && <RecommendationSetupWhenSelection />}
      </AnimatePresence>
    </Page>
  );
}

const RecommendationSetupWhen = () => {
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
          어떤 날 선물을 주고자 하나요?
        </Page.Title>
        <Page.SubTitle className="z-10 text-gray-400">
          선물을 주고자 하는 상황을 알려주세요
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
          src="/static/images/recommendation-when-thx-full.png"
          alt="recommendation-when-thx-full"
          width={390}
          height={390}
          className="max-h-[50vh] w-full object-contain"
        />
      </motion.div>
    </Page.Container>
  );
};

const RecommendationSetupWhenSelection = () => {
  const router = useRouter();
  const { setValue } = useFormContext<RecommendationSetupFormData>();
  const [name, occasion] = useWatch<RecommendationSetupFormData>({
    name: ["name", "occasion"],
  });
  const option = OPTIONS.find(({ key }) => key === occasion) || OPTIONS[0];

  return (
    <>
      <Page.Container
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mt-[17px]"
      >
        <Page.Title className="text-gray-100">{option.title(name)}</Page.Title>
      </Page.Container>
      <Page.Container
        as={motion.div}
        noPadding
        className={cn("flex h-full items-center justify-center", option.bg)}
      >
        <option.image key={occasion} />
      </Page.Container>
      <Page.Container as={motion.div} noPadding className="mt-auto w-full">
        <div className="no-scrollbar overflow-x-auto">
          <div className="flex w-max gap-[18px] px-16px py-[30px]">
            {OPTIONS.map((option) => (
              <Option
                key={option.key}
                active={occasion === option.key}
                onClick={() => setValue("occasion", option.key)}
                option={option}
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
            disabled={!occasion}
            aria-selected={!!occasion}
            onClick={() => router.push("/recommendation/question/steps/6")}
            className="w-full"
          >
            다음
          </Button>
        )}
      </Page.ActionButton>
    </>
  );
};

const Option = ({
  active,
  onClick,
  option,
}: {
  active: boolean;
  onClick: () => void;
  option: RecommendationSetupWhenOption;
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
