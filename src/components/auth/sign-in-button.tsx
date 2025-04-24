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
      className="min-w-40·border-none·bg-yellow-300·font-bold·text-yellow-900·tracking-tight·shadow-sm"
    >
      {isPending ? <Spinner /> : <p>카카오로 시작하기</p>}
    </Button>
  );
};
