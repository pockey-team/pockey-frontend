"use client";

import Link from "next/link";
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
  const { login } = useKakaoSignIn({
    callbackUrl: `/recommendation/result/${callbackTargetResultId}`,
  });

  const handleSave = () => {
    login();
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
          <Button className="flex-1 py-16px text-subtitle-18-semibold" asChild>
            <Link href="/">그만할래요</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
