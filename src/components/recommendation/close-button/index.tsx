"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useKakaoSignIn } from "@/hooks/useKakaoSignIn";

interface Props {
  callbackTargetResultId: string;
}

export const RecommendationCloseButton = ({
  callbackTargetResultId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { login } = useKakaoSignIn({
    callbackUrl: `/recommendation/result/${callbackTargetResultId}`,
  });

  const handleSave = () => {
    sendGAEvent("event", "save_decision_click", {
      choice: "save",
      button_text: "저장할래요",
    });
    login();
  };

  const handleCancel = () => {
    sendGAEvent("event", "save_decision_click", {
      choice: "cancel",
      button_text: "그만할래요",
    });
    router.push("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Link href="/" className="text-body-16-regular text-gray-500">
          닫기
        </Link>
      </DialogTrigger>
      <DialogContent className="min-h-[276px] w-[310px] rounded-2xl border-none bg-gray-800 p-24px">
        <DialogHeader className="flex size-full justify-center">
          <DialogTitle className="text-gray-100 text-heading-24-semibold">
            작성 중인 카드가 <br /> 저장되지 않을 수 있어요
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center justify-center gap-8px">
          <Button
            onClick={handleSave}
            className="!text-gray-700 flex-1 bg-primary-500 py-16px text-subtitle-18-semibold"
          >
            저장할래요
          </Button>
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: Replaced from Link */}
          {/** biome-ignore lint/a11y/noStaticElementInteractions: Replaced from Link */}
          <span
            className="flex-1 py-16px text-subtitle-18-semibold"
            onClick={handleCancel}
          >
            그만할래요
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
