"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useRecommendSessionControllerGetRecommendSessionResults } from "@/api/__generated__/index";
import type { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { DetailCard } from "@/components/recommendation/detail-card";
import { Page } from "@/components/shared/page";

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

const SharePage = () => {
  const params = useParams();
  const productId = Number(params.id);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId")?.toString();

  const { data: product, isLoading } =
    useRecommendSessionControllerGetRecommendSessionResults<
      RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[]
    >(sessionId || "", {
      query: {
        enabled: !!sessionId,
        select: (response) =>
          response.data as unknown as RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[],
      },
    });

  const currentProduct = product?.find((item) => item.product.id === productId);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page className="min-h-screen bg-gray-900">
      <div className="absolute top-0px right-0px left-0px z-30 flex-1 overflow-auto desktop:bg-gray-900">
        <Page.Container className="!px-0px desktop:max-w-[390px] mobile:max-w-full flex-1 overflow-x-hidden bg-gray-900">
          {currentProduct ? (
            <DetailCard data={currentProduct} />
          ) : (
            <div className="flex min-h-screen flex-col items-center justify-center">
              <h1 className="mb-4 font-bold text-gray-100 text-xl">
                상품 정보를 불러올 수 없습니다
              </h1>
              <p className="text-gray-400">다시 시도해 주세요.</p>
            </div>
          )}
        </Page.Container>
      </div>
    </Page>
  );
};

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0px z-50 flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-16px">
        <div className="animate-bounce">
          <Image
            src="/static/images/symbol.svg"
            alt="logo"
            width={45}
            height={45}
            priority
          />
        </div>
        <div className="mt-4 text-gray-100 text-subtitle-18-medium">
          상품을 불러오는 중입니다.
        </div>
      </div>
    </div>
  );
};

export default SharePage;
