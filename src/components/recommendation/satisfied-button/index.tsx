"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SignInButton } from "@/components/auth/sign-in";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const SatisfiedButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const handleClick = () => {
    if (session.data) {
      router.push(`/recommendation/result/${"상품디테일아이디"}`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={handleClick}
        variant="outline"
        className="w-1/2 rounded-xl bg-primary-500 py-16px text-subtitle-18-bold text-xl tracking-tight hover:bg-[#C0DAFF]/80 focus:bg-primary-500 focus-visible:bg-primary-500 active:bg-primary-500"
      >
        마음에 들어요
      </Button>
      <DialogContent className="min-h-[276px] w-[310px] rounded-2xl border-none bg-gray-800 p-24px">
        <DialogHeader className="flex size-full flex-col justify-center gap-24px">
          <DialogTitle className="text-gray-100 text-heading-24-semibold">
            추천 이유가 궁금하다면 <br />
            지금 로그인해보기
          </DialogTitle>
          <DialogDescription className="text-body-14-semibold">
            선택된 취향과 관심사를 바탕으로 골랐어요.
          </DialogDescription>
        </DialogHeader>
        <SignInButton callback={`/recommendation/result/${"sample-id"}`} />
      </DialogContent>
    </Dialog>
  );
};
