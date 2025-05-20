import { useSession } from "next-auth/react";
import { useState } from "react";

export const useLoginDialog = () => {
  const { status } = useSession();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const isLoggedIn = status === "authenticated";

  const handleCheckLogin = (onSuccess?: () => void) => {
    if (isLoggedIn) {
      onSuccess?.();
      return true;
    }
    setIsLoginDialogOpen(true);
    return false;
  };

  return {
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    handleCheckLogin,
    isLoggedIn,
  };
};
