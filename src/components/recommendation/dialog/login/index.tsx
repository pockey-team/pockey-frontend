"use client";

import { SignInButton } from "@/components/auth/sign-in";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  callbackUrl: string;
  title?: string;
  description?: string;
}

export const LoginDialog = ({
  isOpen,
  onOpenChange,
  callbackUrl,
  title = "추천 이유가 궁금하다면 \n지금 로그인해보기",
  description = "선택된 취향과 관심사를 바탕으로 골랐어요.",
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="min-h-[276px] w-[310px] rounded-2xl border-none bg-gray-800 p-24px">
        <DialogHeader className="flex size-full flex-col justify-center gap-24px">
          <DialogTitle className="whitespace-pre-line text-gray-100 text-heading-24-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-body-14-semibold">
            {description}
          </DialogDescription>
        </DialogHeader>
        <SignInButton callback={callbackUrl} />
      </DialogContent>
    </Dialog>
  );
};
