import { signIn } from "next-auth/react";

interface UseKakaoSignInProps {
  onError?: (error: unknown) => void;
  callbackUrl?: string;
}

export const useKakaoSignIn = ({
  onError,
  callbackUrl = "/",
}: UseKakaoSignInProps = {}) => {
  const login = async () => {
    try {
      await signIn("kakao", {
        callbackUrl: `${window.location.origin}${callbackUrl}`,
        redirect: true,
      });
    } catch (error) {
      onError?.(error);
    }
  };

  return {
    login,
  };
};
