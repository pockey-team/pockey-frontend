"use client";

import { useRouter } from "next/navigation";
import { LoginDialog } from "@/components/recommendation/dialog/login";
import { useLoginDialog } from "@/components/recommendation/dialog/login/hooks/useLoginDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  itemId: number;
  receiverName: string;
}

export const SatisfiedButton = ({ itemId, receiverName }: Props) => {
  const { isLoginDialogOpen, setIsLoginDialogOpen, isLoggedIn } =
    useLoginDialog();

  const router = useRouter();

  const handleClick = () => {
    if (isLoggedIn) {
      router.push(`/recommendation/result/${itemId}?name=${receiverName}`);
      return;
    }

    setIsLoginDialogOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        className={cn(
          "w-1/2 rounded-xl border-none bg-primary-500 py-16px text-subtitle-18-bold text-xl tracking-tight hover:bg-primary-500/80 focus:bg-primary-500 focus-visible:bg-primary-500 active:bg-primary-500",
          "scale-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
        )}
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
