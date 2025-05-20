import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";

interface Props {
  retry?: () => void;
}

export const PageError = ({ retry, children }: PropsWithChildren<Props>) => {
  return (
    <Page className="bg-recommendation-setup-name-complete">
      <Page.Header>
        <Page.Header.Right>
          <Link href="/" className="text-body-16-regular text-gray-500">
            닫기
          </Link>
        </Page.Header.Right>
      </Page.Header>
      <Page.Container className="flex h-full flex-col justify-center">
        <Page.Title className="mb-12px text-gray-100">오류</Page.Title>
        <Page.SubTitle className="mb-48px text-gray-400">
          {children}
        </Page.SubTitle>
        <Button onClick={retry} aria-selected className="mt-4">
          다시 시도하기
        </Button>
      </Page.Container>
    </Page>
  );
};
