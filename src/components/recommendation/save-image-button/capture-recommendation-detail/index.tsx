import { type ForwardedRef, forwardRef, type Ref } from "react";
import type {
  RecommendSessionControllerSubmitAnswer201OneOfOneoneItem,
  RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct,
} from "@/api/__generated__/index.schemas";
import { DetailCard } from "@/components/recommendation/detail-card";

interface Props {
  item:
    | RecommendSessionControllerSubmitAnswer201OneOfOneoneItem
    | RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct;
  isCapturing: boolean;
  receiverName: string;
}

export const CaptureRecommendationDetail = forwardRef(
  (
    { item, isCapturing, receiverName }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref as Ref<HTMLDivElement>}>
        <DetailCard
          // @ts-ignore
          data={item}
          isCapturing={isCapturing}
          receiverName={receiverName}
          hideOnCapture
        />
      </div>
    );
  },
);

CaptureRecommendationDetail.displayName = "CaptureRecommendationDetail";
