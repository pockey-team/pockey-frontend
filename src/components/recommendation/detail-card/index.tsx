"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import Image from "next/image";
import type { Session } from "next-auth";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { wishlistControllerAddWishlist } from "@/api/__generated__";
import type {
  RecommendSessionControllerSubmitAnswer201OneOfOneoneItem,
  RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct,
} from "@/api/__generated__/index.schemas";
import { NextPick } from "@/components/recommendation/next-pick";
import { ContentSection } from "@/components/recommendation/result/detail-contents/content-section";
import { Button } from "@/components/ui/button";
import { TOAST_STYLE } from "@/constants/recommendation-result";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { cn } from "@/lib/utils";
import { getSessionResultStorageKey } from "@/utils/recommendation";

interface ProductItemWithWishlist
  extends RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct {
  isMyWishlist: boolean;
}

interface Props {
  data:
    | RecommendSessionControllerSubmitAnswer201OneOfOneoneItem
    | ProductItemWithWishlist;
  hideOnCapture?: boolean;
  isCapturing?: boolean;
  receiverName?: string;
  isSharePage?: boolean;
  session?: Session | null;
}

export const DetailCard = ({
  data,
  hideOnCapture = false,
  isCapturing = false,
  receiverName = "",
  isSharePage = false,
  session,
}: Props) => {
  const queryClient = useQueryClient();

  const { sessionId = "default" } = useSearchParamsObject<{
    sessionId?: string;
  }>();

  const queryKey = useMemo(() => {
    if (isFullItem(data)) {
      return ["productDetail", data.product.id, receiverName];
    }

    return ["productDetail", data.id, receiverName];
  }, [data, receiverName]);

  const initialHeartFilledState = useMemo(() => {
    if (isFullItem(data)) {
      // isRecommendation이 true일 때 data.product는 세션 스토리지에서 온 아이템일 수 있으며,
      // isMyWishlist 속성이 동적으로 추가되었을 수 있음을 @ts-ignore로 명시합니다.
      // @ts-ignore
      return !!data.product.isMyWishlist;
    }
    return !!data.isMyWishlist;
  }, [data]);

  const [isHeartFilled, setIsHeartFilled] = useState(initialHeartFilledState);

  useEffect(() => {
    setIsHeartFilled(initialHeartFilledState);
  }, [initialHeartFilledState]);

  const productData = useMemo(() => {
    return isFullItem(data) ? data.product : data;
  }, [data]);

  const wishListMutation = useMutation({
    mutationFn: async () =>
      wishlistControllerAddWishlist(
        {
          productId: productData.id,
          receiverName,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      ),
    onSuccess: () => {
      setIsHeartFilled(true);
      queryClient.invalidateQueries({
        queryKey,
      });
      // toast.success("보관함에 추가되었어요.");
    },
  });

  const handleClickHeart = async () => {
    if (isHeartFilled) {
      return;
    }

    await wishListMutation.mutateAsync();

    if (typeof window !== "undefined") {
      const storageKey = getSessionResultStorageKey(sessionId);
      const currentItemsString = window.sessionStorage.getItem(storageKey);
      const currentItems: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[] =
        currentItemsString ? JSON.parse(currentItemsString) : [];

      const updatedItems = currentItems.map((pItem) => {
        if (pItem.product.id === productData.id) {
          return {
            ...pItem,
            product: {
              ...pItem.product,
              isMyWishlist: true,
            },
          };
        }
        return pItem;
      });

      window.sessionStorage.setItem(storageKey, JSON.stringify(updatedItems));
      setIsHeartFilled(true);
    }

    toast.success("보관함에 추가되었어요.", {
      duration: 2000,
      id: "wishlist-toast",
      icon: null,
      style: TOAST_STYLE,
    });
  };

  return (
    <div
      className={cn(
        isCapturing || isSharePage ? "h-full min-h-screen" : undefined,
        "flex flex-col",
      )}
    >
      <div
        className={cn(
          isSharePage
            ? "size-[342px] overflow-hidden rounded-3xl"
            : "h-[465px] mobile:w-full w-[390px]",
          "relative mx-auto",
        )}
      >
        <Image src={productData.imageUrl} fill priority alt="상품이미지" />
      </div>

      <div className="flex flex-col px-16px">
        <ContentSection>
          <div className="flex flex-col">
            {isCapturing ||
              (isSharePage && (
                <p
                  className={cn(
                    isSharePage ? "text-gray-600" : "text-gray-200",
                    "text-body-16-bold ",
                  )}
                >
                  {receiverName}님을 위한 선물
                </p>
              ))}

            {!isCapturing ||
              (!isSharePage && (
                <p className="text-gray-400">
                  {JSON.parse(productData.category).join(" | ")}
                </p>
              ))}

            <div className="flex items-start justify-between py-12px">
              <p
                className={cn(
                  isSharePage
                    ? "max-w-full text-gray-600"
                    : "max-w-[240px] text-gray-100",
                  " break-keep font-semibold text-[22px]",
                )}
              >
                {productData.name}
              </p>

              {!isSharePage && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "group hover:bg-transparent",
                    hideOnCapture ? "hidden" : "block",
                  )}
                  onClick={handleClickHeart}
                  disabled={wishListMutation.isPending || isHeartFilled}
                >
                  <Heart
                    fill={isHeartFilled ? "#C9DAFF" : "none"}
                    stroke="#C9DAFF"
                    className="border-primary-500 text-gray-100 hover:bg-primary-500 group-hover:text-primary-500"
                  />
                </Button>
              )}
            </div>
            {!isSharePage && (
              <p
                className={cn(
                  "text-gray-300 text-subtitle-18-medium",
                  hideOnCapture ? "hidden" : "block",
                )}
              >
                {productData.priceRange}
              </p>
            )}
          </div>
        </ContentSection>

        {!isSharePage && (
          <ContentSection
            title="이 선물, 이런 감정을 담았어요"
            hideOnCapture={hideOnCapture}
          >
            <div className="flex flex-wrap gap-8px">
              {productData.tags?.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </div>
          </ContentSection>
        )}

        {isFullItem(data) && (
          <ContentSection
            title="이 선물로 전하고 싶은 마음"
            subTitle={isFullItem(data) ? data.minifiedReason : undefined}
            showBackground
            isSharePage={isSharePage}
          >
            <p className={cn(isSharePage ? "text-gray-600" : "text-gray-100")}>
              {isFullItem(data) ? data.reason : undefined}
            </p>
          </ContentSection>
        )}

        {!isSharePage && session && (
          <ContentSection
            title="함께 보면 좋을 선물"
            hideOnCapture={hideOnCapture}
          >
            <NextPick
              ids={
                isFullItem(data)
                  ? data.product.nextPickProductIds
                  : data.nextPickProductIds
              }
              session={session}
            />
          </ContentSection>
        )}

        {isCapturing && (
          <div className="flex w-full items-center justify-center">
            <Image
              src="/share/footer-logo.svg"
              alt="footer-logo"
              width={100}
              height={100}
            />
          </div>
        )}

        {/* {isSharePage && (
          <div className="flex w-full items-center justify-center">
            <Image
              src="/share/footer-logo.svg"
              alt="footer-logo"
              width={74}
              height={24}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

const isFullItem = (
  data: Props["data"],
): data is RecommendSessionControllerSubmitAnswer201OneOfOneoneItem => {
  return "product" in data;
};

const Chip = ({ label }: { label: string }) => {
  return (
    <div className="rounded-xl bg-gray-600 px-16px py-8px text-body-14-semibold text-gray-200">
      {label}
    </div>
  );
};
