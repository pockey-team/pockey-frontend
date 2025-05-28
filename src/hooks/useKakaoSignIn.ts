import { signIn } from "next-auth/react";
import { getDeviceId } from "@/utils/device-id";

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
      const deviceId = getDeviceId();

      if (deviceId) {
        const cookieName = "nextauth_deviceId";
        const cookieValue = encodeURIComponent(deviceId);
        const maxAgeInSeconds = 5 * 60;
        const path = "/";
        // biome-ignore lint/suspicious/noDocumentCookie: false positive
        document.cookie = `${cookieName}=${cookieValue}; path=${path}; max-age=${maxAgeInSeconds}; SameSite=Lax`;
      }

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
