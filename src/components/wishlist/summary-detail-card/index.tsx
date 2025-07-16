import { sendGAEvent } from "@next/third-parties/google";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import { toast } from "sonner";
import { wishlistControllerRemoveWishlist } from "@/api/__generated__";
import { Button } from "@/components/ui/button";
import { TOAST_STYLE } from "@/constants/recommendation-result";
import { getQueryClient } from "@/lib/tanstack-query";
import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  product: Product;
  receiverName: string;
  session: Session | null;
  wishlistId: number;
}

interface Product {
  id: number;
  name: string;
  price: string | number | null;
  imageUrl: string;
  url: string;
}

export const SummaryDetailCard = ({
  imageUrl,
  product,
  receiverName,
  session,
  wishlistId,
}: Props) => {
  const queryClient = getQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () =>
      wishlistControllerRemoveWishlist(wishlistId, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    onSuccess: () => {
      toast.success(`${product.name} 상품이 보관함에서 삭제되었어요.`, {
        duration: 2000,
        id: "wishlist-delete-toast",
        icon: null,
        style: TOAST_STYLE,
      });
      queryClient.invalidateQueries({
        queryKey: ["wishlistByReceiverName", receiverName],
      });
      queryClient.invalidateQueries({
        queryKey: ["wishlistSummary"],
      });
    },
  });

  const handleDeleteWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    deleteMutation.mutateAsync();
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sendGAEvent("event", "recommendation_action_click", {
      action: "buy",
      button_text: "구매하기",
    });
  };

  return (
    <div
      className={cn(
        "flex h-[284px] w-[171px] flex-col items-center justify-center gap-8px rounded-2xl bg-gradient-summary-card p-12px",
        "scale-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
      )}
    >
      <div className="relative h-[146px] w-full overflow-hidden rounded-2xl">
        <Image src={imageUrl} alt="" fill className="object-cover" priority />

        <Button
          variant="ghost"
          type="button"
          className="!rounded-full absolute top-4px right-4px flex size-[28px] items-center justify-center bg-gray-800/30 transition-transform duration-100 ease-in-out hover:scale-110 hover:bg-gray-800/30"
          disabled={deleteMutation.isPending}
          onClick={handleDeleteWishlist}
        >
          <Heart fill="#c9dafe" stroke="#c9dafe" width={14} height={13} />
        </Button>
      </div>
      <div className="flex w-full flex-col">
        <div className="h-40px">
          <p className="text-body-13-semibold text-gray-800">{product.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-caption-12-medium text-gray-500">금액</p>
          <p className="text-caption-12-medium text-gray-700">
            {product.price ?? "가격 정보 없음"}
          </p>
        </div>
      </div>
      <Button
        asChild
        className="hover:!bg-primary-500/80 !text-gray-900 !rounded-xl w-full bg-primary-500 py-8px text-body-13-semibold"
      >
        <Link href={product.url} target="_blank" onClick={handleBuyClick}>
          구매하기
        </Link>
      </Button>
    </div>
  );
};
