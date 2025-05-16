"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/shared/button";
import { useKakaoSignIn } from "@/hooks/useKakaoSignIn";

export const SignInButton = () => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  const { login } = useKakaoSignIn({ callbackUrl });
  return (
    <Button
      size="large"
      onClick={login}
      className="hover:!bg-kakao/80 h-56px w-full min-w-40 border-none bg-kakao font-bold text-gray-700 text-subtitle-18-bold text-yellow-900 tracking-tight shadow-sm"
    >
      카카오로 시작하기
    </Button>
  );
};
