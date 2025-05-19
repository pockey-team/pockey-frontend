"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { ContentSection } from "@/components/recommendation/result/detail-contents/content-section";
import type { RecommendationDetailContentsProps } from "@/components/recommendation/result/detail-contents/types";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { RECOMMENDATION_RESULT_DETAIL_CONTENTS } from "@/constants/recommendation-result-detail";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { cn } from "@/lib/utils";
import { getSessionResultStorageKey } from "@/utils/recommendation";
import { NextPick } from "../../next-pick";
import { ShareButton } from "../../share-button";

export interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
  priceRange: string;
  ageRange: string | string[];
  category: string | string[];
  friendshipLevel: string[] | string;
  intention: string[] | string;
  situation: string[] | string;
  tags: string[] | string;
  targetGender?: string;
  brand?: string | null;
  nextPickProductIds?: number[] | null;
  price?: number | null;
}

export const RecommendationDetailContents = ({
  showCategory = true,
  showHeart = true,
  showFeelingsSection = true,
  showMessageSection = true,
  showRelatedProductsSection = true,
  relatedProducts = RECOMMENDATION_RESULT_DETAIL_CONTENTS.relatedProducts,
  showFooterLogo = false,
  showPriceRange = true,
  detailId,
  showActionButton = false,
  isCapturing = false,
  isMobile,
  name,
  productData,
}: RecommendationDetailContentsProps) => {
  const { sessionId = "default" } = useSearchParamsObject<{
    sessionId?: string;
  }>();

  const items: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[] =
    JSON.parse(
      window.sessionStorage.getItem(getSessionResultStorageKey(sessionId)) ||
        "[]",
    );

  // const currentItem = useMemo(() => {
  //   return items.find((item) => item.product.id === Number(detailId));
  // }, [detailId, items]);

  const clientData = useMemo(() => {
    if (typeof window === "undefined") return null;

    try {
      const items: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[] =
        JSON.parse(
          window.sessionStorage.getItem(
            getSessionResultStorageKey(sessionId),
          ) || "[]",
        );

      return items.find((item) => item.product.id === Number(detailId));
    } catch (error) {
      console.error("세션 데이터 파싱 오류:", error);
      return null;
    }
  }, [detailId, sessionId]);

  const currentItem = useMemo(() => {
    if (clientData) {
      return clientData;
    }

    if (productData) {
      return {
        product: productData,
        reason: "서버 반환 데이터 수정 필요",
        minifiedReason: "서버 반환 데이터 수정 필요",
      };
    }
  }, [productData, clientData]);

  const getTagsArray = (tags: unknown): string[] => {
    if (!tags) return [];

    if (Array.isArray(tags)) {
      return tags as string[];
    }

    if (typeof tags === "string") {
      try {
        if (tags.startsWith("[")) {
          return JSON.parse(tags);
        }
        return [tags];
      } catch (e) {
        return [tags];
      }
    }

    return [];
  };

  return (
    <div
      className={cn("grid w-[390px] grid-rows-[1fr_auto] bg-gray-900", {
        "h-screen overflow-hidden": !isCapturing && isMobile,
        "h-auto overflow-visible": isCapturing,
      })}
    >
      <div
        className={cn(
          "flex flex-col overflow-y-auto",
          isCapturing
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-900 text-gray-100",
        )}
      >
        {currentItem?.product?.imageUrl ? (
          <Image
            src={currentItem.product.imageUrl}
            alt="상품이미지"
            width={390}
            height={390}
            id="product-image"
          />
        ) : (
          <div className="flex h-[390px] w-[390px] items-center justify-center bg-gray-800">
            <p className="text-gray-400">이미지 없음</p>
          </div>
        )}

        <section className="flex flex-col px-16px pt-24px pb-48px">
          {showCategory && (
            <nav
              aria-label="카테고리"
              className="flex items-center text-gray-400"
            >
              <ul className="flex items-center">
                {typeof currentItem?.product?.category === "string"
                  ? JSON.parse(currentItem?.product?.category).join(" | ")
                  : currentItem?.product?.category}
              </ul>
            </nav>
          )}

          <div className="my-12px flex items-start">
            <div className="flex flex-1 flex-col items-start">
              {isCapturing && (
                <p className="font-semibold text-[14px] text-gray-400">
                  {name}님을 위한 선물
                </p>
              )}
              <h1 className="font-semibold text-[22px]">
                {currentItem?.product?.name}
              </h1>
            </div>
            {/* {showHeart && (
              <div className="flex w-[96px] justify-end">
                <Heart />
              </div>
            )} */}
          </div>
          {showPriceRange && (
            <p className="text-gray-300 text-subtitle-18-medium">
              {currentItem?.product?.priceRange}
            </p>
          )}

          {showFeelingsSection && (
            <ContentSection title="이 선물, 이런 감정을 담았어요">
              <div className="flex flex-wrap gap-8px">
                {getTagsArray(currentItem?.product?.tags).map((tag) => (
                  <div
                    key={tag}
                    className="max-h-[36px] rounded-xl bg-gray-700 px-16px py-8px text-gray-200"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </ContentSection>
          )}

          {showMessageSection && (
            <ContentSection
              title="이 선물로 전하고 싶은 마음"
              subTitle={currentItem?.minifiedReason}
              isCapturing={isCapturing}
              className="mb-56px"
            >
              {currentItem?.reason}
            </ContentSection>
          )}

          <ContentSection title="함께 보면 좋은 선물">
            <NextPick ids={currentItem?.product.nextPickProductIds ?? []} />
          </ContentSection>
        </section>

        {showFooterLogo && (
          <div className="flex items-center justify-center">
            <Image
              src="/share/footer-logo.svg"
              alt="footer-logo"
              width={100}
              height={100}
            />
          </div>
        )}
        {showActionButton && (
          <div className="h-[100px] w-full shrink-0" aria-hidden="true" />
        )}
      </div>

      {showActionButton && (
        <div className="fixed bottom-0px z-20 min-h-[100px] w-full border-gray-800 border-t bg-gray-900">
          <Page.ActionButton className="mb-0px bg-gray-900 py-16px">
            {() => (
              <div className="flex items-center gap-12px">
                <Button
                  className="!text-gray-700 !rounded-2xl w-1/2 bg-primary-500 py-16px text-subtitle-18-bold"
                  asChild
                >
                  <Link href={currentItem?.product?.url ?? ""} target="_blank">
                    구매하기
                  </Link>
                </Button>
                <ShareButton
                  className="!rounded-2xl w-1/2 py-16px"
                  detailId={detailId}
                  name={name}
                />
              </div>
            )}
          </Page.ActionButton>
        </div>
      )}
    </div>
  );
};
