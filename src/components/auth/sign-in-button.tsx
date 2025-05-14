"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useKakaoSignIn } from "@/hooks/useKakaoSignIn";

export const SignInButton = () => {
  const params = useSearchParams();

  const callbackUrl = params.get("callbackUrl") ?? "/";
  const { login, isPending } = useKakaoSignIn({ callbackUrl });

  return (
    <Button
      onClick={login}
      variant="ghost"
      className="h-56px w-full min-w-40 border-none bg-kakao font-bold text-subtitle-18-bold text-yellow-900 tracking-tight shadow-sm transition-all duration-300 focus:scale-95"
    >
      {isPending ? <Spinner /> : <p>카카오로 시작하기</p>}
    </Button>
  );
};
