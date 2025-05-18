import { type ForwardedRef, forwardRef } from "react";
import { RecommendationDetailContents } from "@/components/recommendation/result/detail-contents";

interface Props {
  className?: string;
  productImage?: string;
  productTitle?: string;
  priceRange?: string;
}

export const CaptureRecommendationDetail = forwardRef(
  (
    { className, productImage, productTitle, priceRange }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref}>
        <RecommendationDetailContents
          showCategory={false}
          showHeart={false}
          showFeelingsSection={false}
          showMessageSection={true}
          showRelatedProductsSection={false}
          showFooterLogo={true}
          showPriceRange={false}
        />
      </div>
    );
  },
);

CaptureRecommendationDetail.displayName = "CaptureRecommendationDetail";
