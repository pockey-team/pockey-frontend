"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RecommendationSetupFormData } from "@/types/recommendation/setup";

export default function RecommendationSetupNamePage() {
  const router = useRouter();
  const { register } = useFormContext<RecommendationSetupFormData>();
  const isValid = !!useWatch<RecommendationSetupFormData>({ name: "name" });

  return (
    <Page className="bg-gray-800">
      <Page.Header>
        <Page.Header.Right>
          <Link href="/" className="text-body-16-regular text-gray-500">
            닫기
          </Link>
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="flex h-full flex-1 flex-col justify-center">
        <Page.Title
          as={motion.h1}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-gray-100"
        >
          누구에게 줄 선물인가요?
        </Page.Title>

        <div className="flex w-full flex-shrink items-center justify-center px-20px py-[28px]">
          <Present21Image />
        </div>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col px-[27px]"
        >
          <Label htmlFor="name">선물 받는 사람</Label>
          <Input
            placeholder="이름을 지어주세요"
            maxLength={7}
            required
            {...register("name", { required: true })}
          />
        </motion.div>
      </Page.Container>

      <Page.ActionButton
        as={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="mt-24px"
      >
        {(props) => (
          <Button
            {...props}
            size="x-large"
            disabled={!isValid}
            aria-selected={!!isValid}
            onClick={() => router.push("/recommendation/setup/steps/1")}
          >
            다음
          </Button>
        )}
      </Page.ActionButton>
    </Page>
  );
}

const Present21Image = () => {
  return (
    <div className="relative flex flex-shrink flex-col items-center justify-center">
      <motion.div
        className="absolute h-[180px] w-[180px] rounded-full bg-[#94F2FF]/[.68] blur-[100px]"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/static/images/recommendation-present-21.png"
          alt="선물 상자"
          width={632}
          height={631}
          className="relative z-10 h-auto max-h-[40vh] w-full object-contain"
        />
      </motion.div>
    </div>
  );
};
