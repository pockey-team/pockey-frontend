"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { Session } from "next-auth";
import { wishlistControllerGetWishlistGroups } from "@/api/__generated__";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { WishListSummaryCard } from "@/components/wishlist/summary-card";
import { cn } from "@/lib/utils";

interface Props {
  session: Session | null;
  receiverName: string;
}

interface WishlistItem {
  receiverName: string;
  count: number;
  imageUrls: string[];
}

export const SummaryCardSection = ({ session, receiverName }: Props) => {
  const { data: wishlistSummary, isLoading } = useQuery({
    queryKey: ["wishlistSummary"],
    queryFn: () =>
      wishlistControllerGetWishlistGroups({
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    select: (data) => data.data,
  });

  if (!isLoading || !wishlistSummary) {
    throw new Error("위시리스트 데이터를 불러올 수 없습니다.");
  }

  const wishSummaryList: WishlistItem[] = wishlistSummary ?? [];

  const uniqueWishList = Array.from(
    new Map(wishSummaryList.map((item) => [item.receiverName, item])).values(),
  );

  const uniqueWishListWithId = uniqueWishList.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });

  const filteredWishList = receiverName
    ? uniqueWishListWithId.filter((item) => item.receiverName === receiverName)
    : uniqueWishListWithId;

  return (
    <div className="relative flex-1 overflow-auto">
      <Page.Container className="bg-gray-900 pb-48px">
        <Page.Title className="text-start">
          {filteredWishList.length === 0 ? (
            <>
              <p>아직 선물함이 비어있어요</p>
              <span>새롭게 채워볼까요?</span>
            </>
          ) : (
            <>
              <p>정성스럽게 고른</p>
              <div className="flex h-32px items-center">
                <span className="text-primary-500">
                  {filteredWishList.length}개
                </span>
                <span className="ml-1">의 보관함이 있어요</span>
              </div>
            </>
          )}
        </Page.Title>

        <div className="mt-32px mb-48px flex items-center gap-8px overflow-x-auto">
          <Button
            asChild
            className={cn(
              "focus:!bg-primary-500 focus:!text-gray-900 px-12px py-[6px] hover:bg-transparent",
              {
                "!text-gray-900 bg-primary-500": receiverName === undefined,
              },
            )}
          >
            <Link href="/wishlist">전체</Link>
          </Button>
          {uniqueWishListWithId?.map((receiver) => (
            <Button
              asChild
              key={receiver.id}
              className={cn(
                "focus:!bg-primary-500 focus:!text-gray-900 bg-gray-700 px-12px py-[6px] text-gray-300 hover:bg-transparent",
                {
                  "!text-gray-900 bg-primary-500":
                    receiver.receiverName === receiverName,
                },
              )}
            >
              <Link href={`/wishlist?receiver=${receiver.receiverName}`}>
                {receiver.receiverName}
              </Link>
            </Button>
          ))}
        </div>

        {filteredWishList.length === 0 ? (
          <div className="flex flex-col gap-12px">
            <div className="flex items-center gap-4px">
              <p className="text-body-14-medium text-gray-200">선물함</p>
              <p className="text-caption-12-medium text-gray-400">0개</p>
            </div>

            <div className="flex h-[208px] w-[172px] items-center justify-center rounded-2xl bg-gray-700 text-body-14-medium text-gray-500">
              선물함이 비어있어요
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-16px gap-y-24px">
            {filteredWishList.map((item) => (
              <Link
                href={`/wishlist/${item.id}?receiver=${item.receiverName}`}
                key={item.id}
              >
                <WishListSummaryCard
                  receiverName={item.receiverName}
                  count={item.count}
                  images={item.imageUrls}
                />
              </Link>
            ))}
          </div>
        )}
      </Page.Container>
    </div>
  );
};
