import { type ForwardedRef, forwardRef, type Ref } from "react";
import { RecommendationDetailContents } from "@/components/recommendation/result/detail-contents";

interface Props {
  className?: string;
  productImage?: string;
  productTitle?: string;
  priceRange?: string;
  detailId: string;
  isCapturing: boolean;
  name?: string;
}

export const CaptureRecommendationDetail = forwardRef(
  (
    {
      className,
      productImage,
      productTitle,
      priceRange,
      detailId,
      isCapturing,
      name,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref as Ref<HTMLDivElement>}>
        <RecommendationDetailContents
          showCategory={false}
          showHeart={false}
          showFeelingsSection={false}
          showMessageSection={true}
          showRelatedProductsSection={false}
          showFooterLogo={true}
          showPriceRange={false}
          detailId={detailId}
          isCapturing={isCapturing}
          name={name}
        />
      </div>
    );
  },
);

CaptureRecommendationDetail.displayName = "CaptureRecommendationDetail";
