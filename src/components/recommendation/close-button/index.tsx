"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useKakaoSignIn } from "@/hooks/useKakaoSignIn";

interface Props {
  callbackTargetResultId: number;
  item: any;
  receiverName: string;
}

export const RecommendationCloseButton = ({
  callbackTargetResultId,
  item,
  receiverName,
}: Props) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { login } = useKakaoSignIn({
    callbackUrl: `/recommendation/result/${callbackTargetResultId}`,
  });

  const handleSave = () => {
    sendGAEvent("event", "save_decision_click", {
      choice: "save",
      button_text: "저장할래요",
    });

    login();

    sessionStorage.setItem(
      "pockey-pending-wishlist-action",
      JSON.stringify({
        productId: item.product.id,
        receiverName,
      }),
    );
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
        <Button
          type="button"
          variant="ghost"
          className="text-body-16-regular text-gray-500 hover:bg-transparent hover:text-gray-500"
        >
          닫기
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[310px] h-[264px] rounded-2xl border-none bg-gray-800">
        <DialogTitle className="sr-only">
          추천받은 선물을 저장하는지 확인합니다.
        </DialogTitle>
        <DialogDescription className="sr-only">
          추천받은 선물 저장 Dialog
        </DialogDescription>
        <p className="flex items-center justify-center pt-40px text-center text-gray-100 text-heading-24-semibold leading-[32px]">
          추천 받은 카드가 <br /> 저장되지 않을 수 있어요
        </p>
        <DialogFooter className="flex items-center justify-center">
          <div className="flex max-h-[44px] w-full items-center justify-center gap-8px">
            <Button
              onClick={handleSave}
              className="!text-gray-700 hover:!bg-primary-500 flex-1 bg-primary-500 py-12px text-subtitle-18-semibold"
            >
              저장할래요
            </Button>
            <Button
              className="flex-1 bg-gray-700 py-16px text-subtitle-18-semibold text-white hover:bg-gray-700"
              onClick={handleCancel}
            >
              그만할래요
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
