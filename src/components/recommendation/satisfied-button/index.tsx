"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { wishlistControllerAddWishlist } from "@/api/__generated__";
import { LoginDialog } from "@/components/recommendation/dialog/login";
import { useLoginDialog } from "@/components/recommendation/dialog/login/hooks/useLoginDialog";
import { Button } from "@/components/ui/button";
import { TOAST_STYLE } from "@/constants/recommendation-result";
import { getQueryClient } from "@/lib/tanstack-query";
import { cn } from "@/lib/utils";

interface Props {
  itemId: number;
  receiverName: string;
}

export const SatisfiedButton = ({ itemId, receiverName }: Props) => {
  const { isLoginDialogOpen, setIsLoginDialogOpen, isLoggedIn } =
    useLoginDialog();
  const queryClient = getQueryClient();
  const router = useRouter();
  const { data: session } = useSession();

  const likeMutation = useMutation({
    mutationFn: async () =>
      wishlistControllerAddWishlist(
        {
          productId: itemId,
          receiverName,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlistSummary"],
      });
    },
  });

  const handleClick = async () => {
    if (isLoggedIn) {
      await likeMutation.mutateAsync();
      toast.success("보관함에 추가되었어요.", {
        duration: 2000,
        id: "wishlist-toast",
        icon: null,
        style: TOAST_STYLE,
      });
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
