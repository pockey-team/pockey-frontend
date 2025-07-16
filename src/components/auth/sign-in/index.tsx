"use client";

import { sendGAEvent } from "@next/third-parties/google";
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

  const handleKakaoLogin = () => {
    sendGAEvent("event", "kakao_login_click", {
      button_text: "카카오로 시작하기",
    });
    login();
  };

  return (
    <Button
      size="large"
      onClick={handleKakaoLogin}
      className={cn(
        "hover:!bg-kakao/80 h-56px w-full min-w-40 border-none bg-kakao font-bold text-gray-700 text-subtitle-18-bold text-yellow-900 tracking-tight shadow-sm",
        "scale-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
      )}
    >
      카카오로 시작하기
    </Button>
  );
};
