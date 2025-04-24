import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

type UseKakaoSignInProps = {
  callbackUrl?: string;
};

export const useKakaoSignIn = ({
  callbackUrl = "/",
}: UseKakaoSignInProps = {}) => {
  const login = async () => {
    await signIn("kakao", {
      callbackUrl: `${window.location.origin}${callbackUrl}`,
      redirect: true
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login
  });

  return {
    login: () => mutateAsync(),
    isPending,
  };
};