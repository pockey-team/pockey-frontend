"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/shared/button";
import { useKakaoSignIn } from "@/hooks/useKakaoSignIn";
import { cn } from "@/lib/utils";

interface Props {
  callback?: string;
}

export const SignInButton = ({ callback }: Props) => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  const { login } = useKakaoSignIn({ callbackUrl: callback ?? callbackUrl });

  return (
    <Button
      size="large"
      onClick={login}
      className={cn(
        "hover:!bg-kakao/80 h-56px w-full min-w-40 border-none bg-kakao font-bold text-gray-700 text-subtitle-18-bold text-yellow-900 tracking-tight shadow-sm",
        "scale-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
      )}
    >
      카카오로 시작하기
    </Button>
  );
};
