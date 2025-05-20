"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "../dialog/login";
import { useLoginDialog } from "../dialog/login/hooks/useLoginDialog";

interface Props {
  itemId: number;
}

export const SatisfiedButton = ({ itemId }: Props) => {
  const { isLoginDialogOpen, setIsLoginDialogOpen, isLoggedIn } =
    useLoginDialog();

  const router = useRouter();

  const handleClick = () => {
    if (isLoggedIn) {
      router.push(`/recommendation/result/${itemId}`);
      return;
    }

    setIsLoginDialogOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        className="w-1/2 rounded-xl bg-primary-500 py-16px text-subtitle-18-bold text-xl tracking-tight hover:bg-[#C0DAFF]/80 focus:bg-primary-500 focus-visible:bg-primary-500 active:bg-primary-500"
      >
        마음에 들어요
      </Button>

      <LoginDialog
        isOpen={isLoginDialogOpen && !isLoggedIn}
        onOpenChange={setIsLoginDialogOpen}
        callbackUrl={`/recommendation/result/${itemId}`}
      />
    </>
  );
};
