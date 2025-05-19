"use client";

import { useParams } from "next/navigation";
import { RecommendationDetailContents } from "@/components/recommendation/result/detail-contents";
import { Page } from "@/components/shared/page";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";

const SharePage = () => {
  const { id } = useParams<{ id: string }>();
  const { name, sessionId = "default" } = useSearchParamsObject<{
    name: string;
    sessionId?: string;
  }>();

  return (
    <Page className="bg-gray-900">
      <Page.Container className="flex-1" noPadding>
        <RecommendationDetailContents
          showCategory={false}
          showHeart={false}
          showFeelingsSection={false}
          showMessageSection={true}
          showRelatedProductsSection={false}
          showFooterLogo={true}
          showPriceRange={false}
          detailId={id}
          isCapturing={false}
          name={name}
        />
      </Page.Container>
    </Page>
  );
};

export default SharePage;
