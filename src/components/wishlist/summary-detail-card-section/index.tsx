"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { useEffect } from "react";
import { wishlistControllerGetWishlistsByReceiverName } from "@/api/__generated__";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { SummaryDetailCard } from "@/components/wishlist/summary-detail-card";
import { cn } from "@/lib/utils";

interface Props {
  receiverName: string;
  session: Session | null;
}

interface WishlistDetailItem {
  wishlistId: number;
  product: Product;
  deleted: boolean;
}

interface Product {
  id: number;
  name: string;
  price: string | number | null;
  imageUrl: string;
  url: string;
}

export const SummaryDetailCardSection = ({ receiverName, session }: Props) => {
  const { data: wishlistByReceiverName } = useQuery({
    queryKey: ["wishlistByReceiverName", receiverName],
    queryFn: () =>
      wishlistControllerGetWishlistsByReceiverName(
        { receiverName },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      ),
  });

  const wishlistDetail: WishlistDetailItem[] = Array.isArray(
    wishlistByReceiverName?.data,
  )
    ? wishlistByReceiverName.data
    : [];

  useEffect(() => {
    if (wishlistDetail.length === 0) {
      redirect("/wishlist");
    }
  }, [wishlistDetail.length]);

  return (
    <div>
      <Page.Title className="pb-32px text-start">
        <p>{receiverName}님을 위해 모아둔</p>
        선물 카드는
        <span className="ml-4px text-primary-500">
          {wishlistDetail.length}장
        </span>
        이에요
      </Page.Title>
      <div className="grid grid-cols-2 gap-x-[1rem] gap-y-[1.5rem]">
        {wishlistDetail.map((item) => (
          <Link
            href={`/recommendation/result/${item.product.id}?name=${receiverName}&wish=true`}
            key={item.wishlistId}
          >
            <SummaryDetailCard
              imageUrl={item.product.imageUrl}
              product={item.product}
              receiverName={receiverName}
              session={session}
              wishlistId={item.wishlistId}
            />
          </Link>
        ))}
        <Button
          asChild
          variant="ghost"
          className={cn(
            "!rounded-2xl flex h-[284px] w-[171px] flex-col items-center justify-center gap-16px bg-gray-700 text-gray-500 hover:bg-gray-600/50 hover:text-gray-500",
            "scale-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
          )}
        >
          <Link href="/recommendation/init">
            <Plus />
            <p className="text-body-14-medium">선물 추가하기</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};
