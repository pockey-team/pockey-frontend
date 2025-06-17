"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { productControllerGetProduct } from "@/api/__generated__";
import type { RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct } from "@/api/__generated__/index.schemas";
import { DetailCard } from "@/components/recommendation/detail-card";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";

interface Props {
  productId: number;
  receiverName: string;
}

interface ProductItemWithWishlist
  extends RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct {
  isWishlisted: boolean;
}

export const SummaryDetail = ({ productId, receiverName }: Props) => {
  const { data: session } = useSession();

  const { data: productDetail } = useQuery({
    queryKey: ["productDetail", productId, receiverName],
    queryFn: () =>
      productControllerGetProduct(productId, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    enabled: !!session?.accessToken && !!productId && !!receiverName,
  });

  const productDetailData: ProductItemWithWishlist | undefined =
    productDetail?.data;

  return (
    <Page className="flex min-h-screen flex-col bg-gray-900">
      <Page.Header className="sticky top-0 z-30 bg-gray-900">
        <Page.Header.Left>
          <Back />
        </Page.Header.Left>
        <Page.Header.Right>
          <Button
            asChild
            type="button"
            variant="ghost"
            className="text-gray-500 hover:bg-transparent hover:text-gray-500"
          >
            <Link href="/find">닫기</Link>
          </Button>
        </Page.Header.Right>
      </Page.Header>
      <div className="relative flex-1 overflow-auto">
        <Page.Container
          noPadding
          className="!px-0px desktop:max-w-[390px] mobile:max-w-full bg-gray-900 pb-[100px]"
        >
          {productDetailData ? (
            <DetailCard
              data={productDetailData}
              receiverName={receiverName}
              session={session}
            />
          ) : (
            <div className="flex min-h-[50vh] w-full items-center justify-center">
              <p>존재 하지 않는 상품입니다.</p>
            </div>
          )}
        </Page.Container>
      </div>
    </Page>
  );
};
