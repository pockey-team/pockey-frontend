"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import type { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { DetailCard } from "@/components/recommendation/detail-card";
import { ShareButton } from "@/components/recommendation/share-button";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { getSessionResultStorageKey } from "@/utils/recommendation";

interface Props {
  productId: number;
  receiverName: string;
}

export const ResultDetail = ({ productId, receiverName }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const { sessionId = "default" } = useSearchParamsObject<{
    sessionId?: string;
  }>();

  const items: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[] =
    isBrowser
      ? JSON.parse(
          window.sessionStorage.getItem(
            getSessionResultStorageKey(sessionId),
          ) || "[]",
        )
      : [];

  const item = useMemo(() => {
    return items.find((item) => item.product.id === productId);
  }, [productId, items]);

  return (
    <Page className="flex min-h-screen flex-col bg-gray-900">
      <Page.Header className="sticky top-0 z-30 bg-gray-900">
        <Page.Header.Left>
          <Back
            path={`/recommendation/result?sessionId=${sessionId}&name=${receiverName}`}
          />
        </Page.Header.Left>
        <Page.Header.Right>
          <Button
            asChild
            type="button"
            variant="ghost"
            className="text-gray-500 hover:bg-transparent hover:text-gray-500"
          >
            <Link href="/">닫기</Link>
          </Button>
        </Page.Header.Right>
      </Page.Header>
      <div className="relative flex-1 overflow-auto">
        <Page.Container
          noPadding
          className="!px-0px desktop:max-w-[390px] mobile:max-w-full bg-gray-900 pb-[100px]"
        >
          {item ? (
            <DetailCard
              data={item}
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
      <div className="sticky bottom-0 z-30 bg-gray-900">
        <Page.ActionButton className="!mb-0px !mx-0px mobile:!max-w-full desktop:!max-w-[390px] place-self-center py-8px">
          {() => (
            <div className="flex items-center gap-12px">
              <Button
                className="!text-gray-700 !rounded-2xl hover:!bg-primary-500/80 w-1/2 bg-primary-500 py-16px text-subtitle-18-bold"
                asChild
              >
                <Link href={item?.product.url ?? ""} target="_blank">
                  구매하기
                </Link>
              </Button>
              {item && (
                <ShareButton
                  className="!rounded-2xl w-1/2 py-16px"
                  item={item}
                  receiverName={receiverName}
                />
              )}
            </div>
          )}
        </Page.ActionButton>
      </div>
    </Page>
  );
};
