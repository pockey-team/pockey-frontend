"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import type {
  RecommendSessionControllerSubmitAnswer201OneOfOneoneItem,
  RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct,
} from "@/api/__generated__/index.schemas";
import { NextPick } from "@/components/recommendation/next-pick";
import { ContentSection } from "@/components/recommendation/result/detail-contents/content-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  data:
    | RecommendSessionControllerSubmitAnswer201OneOfOneoneItem
    | RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct;
  hideOnCapture?: boolean;
  isCapturing?: boolean;
  receiverName?: string;
}

export const DetailCard = ({
  data,
  hideOnCapture = false,
  isCapturing = false,
  receiverName = "",
}: Props) => {
  const productData = useMemo(() => {
    return isFullItem(data) ? data.product : data;
  }, [data]);

  return (
    <div
      className={cn(
        isCapturing ? "h-full min-h-screen" : undefined,
        "flex flex-col",
      )}
    >
      <div className="relative h-[465px] mobile:w-full w-[390px]">
        <Image src={productData.imageUrl} fill priority alt="상품이미지" />
      </div>

      <div className="flex flex-col px-16px">
        <ContentSection>
          <div className="flex flex-col">
            {isCapturing && (
              <p className="text-body-16-bold text-gray-200">
                {receiverName}님을 위한 선물
              </p>
            )}
            {!isCapturing && (
              <p className="text-gray-400">
                {JSON.parse(productData.category).join(" | ")}
              </p>
            )}
            <div className="flex items-start justify-between py-12px">
              <p className="max-w-[240px] break-keep font-semibold text-[22px] text-gray-100">
                {productData.name}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "group hover:bg-transparent",
                  hideOnCapture ? "hidden" : "block",
                )}
              >
                <Heart
                  fill="#C9DAFF"
                  className="border-primary-500 text-gray-100 hover:bg-primary-500 group-hover:text-primary-500"
                />
              </Button>
            </div>
            <p
              className={cn(
                "text-gray-300 text-subtitle-18-medium",
                hideOnCapture ? "hidden" : "block",
              )}
            >
              {productData.priceRange}
            </p>
          </div>
        </ContentSection>

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

        <ContentSection
          title="이 선물로 전하고 싶은 마음"
          subTitle={isFullItem(data) ? data.minifiedReason : undefined}
          showBackground
          className="p-16px"
        >
          <p className="text-gray-100">
            {isFullItem(data) ? data.reason : undefined}
          </p>
        </ContentSection>

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
          />
        </ContentSection>

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
