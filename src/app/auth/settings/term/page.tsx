import type { Metadata } from "next";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import TermContent from "@/content/term.mdx";

export const metadata: Metadata = {
  title: "서비스 이용약관 | 포키",
  description: "포키 서비스 이용약관",
};

export default async function TermPage() {
  return (
    <Page className="!h-full bg-gray-800">
      <Page.Header>
        <Page.Header.Left>
          <Back />
        </Page.Header.Left>
        <Page.Header.Center className="text-body-16-regular text-gray-100">
          서비스 이용약관
        </Page.Header.Center>
      </Page.Header>

      <Page.Container className="pb-24px text-gray-100">
        <TermContent />
      </Page.Container>
    </Page>
  );
}
