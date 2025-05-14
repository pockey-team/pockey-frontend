"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const SatisfiedButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-1/2 rounded-xl bg-primary-500 py-20px text-subtitle-18-bold text-xl tracking-tight hover:bg-[#C0DAFF]/80 focus:bg-primary-500 focus-visible:bg-primary-500 active:bg-primary-500"
        >
          마음에 들어요
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[258px] w-full max-w-[325px] rounded-xl border-none bg-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="sr-only">
            로그인 하고 추천 이유를 확인하세요
          </DialogTitle>
        </DialogHeader>
        <h2 className="text-center text-heading-24-semibold">
          <span>로그인 하고</span> <br />
          <span>추천 이유를 확인하세요</span>
        </h2>
        <DialogFooter className="flex flex-row items-center justify-center">
          <Button className="bg-[#4c4c4c] p-16px text-white" asChild>
            <Link href="/login">카카오 로그인하러 가기</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
