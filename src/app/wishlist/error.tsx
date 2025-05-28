"use client";

import Image from "next/image";
import Link from "next/link";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";

export default function WishlistErrorPage() {
  return (
    <Page>
      <Page.Container className="flex h-full flex-1 flex-col items-center justify-center">
        <Image
          src="/present.svg"
          alt="선물이미지"
          width={235}
          height={235}
          priority
        />
        <div className="flex flex-col items-center justify-center gap-12px">
          <h2 className="text-center text-heading-22-semibold">
            마음에 드는 <br />
            선물을 모아두는 공간이에요.
          </h2>
          <p className="text-gray-400 text-subtitle-18-medium">
            선물을 먼저 골라주세요.
          </p>
        </div>
      </Page.Container>
      <Page.ActionButton>
        {() => (
          <Button
            asChild
            className="!rounded-2xl hover:!bg-primary-500/80 !text-gray-700 w-full bg-primary-500 py-16px text-subtitle-16-semibold"
          >
            <Link href="/recommendation/init">선물 하러 가기</Link>
          </Button>
        )}
      </Page.ActionButton>
    </Page>
  );
}
