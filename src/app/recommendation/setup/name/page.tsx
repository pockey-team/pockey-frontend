"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecommendationSetupNamePage() {
  const router = useRouter();

  return (
    <Page className="bg-gray-800">
      <Page.Header>
        <Page.Header.Right>
          <Link href="/" className="text-body-16-regular text-gray-500">
            닫기
          </Link>
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="flex flex-1 flex-col justify-center pb-[100px]">
        <Page.Title className="text-gray-100">
          누구에게 줄 선물인가요?
        </Page.Title>

        <div className="flex w-full items-center justify-center px-20px py-[28px]">
          <Present21Image />
        </div>

        <div className="flex flex-col px-[27px]">
          <Label htmlFor="name">선물 받는 사람</Label>
          <Input name="name" placeholder="이름을 지어주세요" maxLength={7} />
        </div>
      </Page.Container>

      <Page.ActionButton>
        {(props) => (
          <Button
            {...props}
            size="x-large"
            aria-selected={true}
            onClick={() => router.push("/recommendation/setup/steps/1")}
          >
            다음
          </Button>
        )}
      </Page.ActionButton>
    </Page>
  );
}

const Present21Image = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-[180px] w-[180px] rounded-full bg-[#94F2FF]/[.68] blur-[100px]" />
      <Image
        src="/static/images/recommendation-present-21.png"
        alt="선물 상자"
        width={632}
        height={631}
        className="relative z-10"
      />
    </div>
  );
};
