import { Metadata } from "next";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import PrivacyContent from "@/content/privacy.mdx";

export const metadata: Metadata = {
  title: "개인정보 처리방침 | 포키",
  description: "포키 개인정보 처리방침",
};

export default async function PrivacyPage() {
  return (
    <Page className="!h-full bg-gray-800">
      <Page.Header>
        <Page.Header.Left>
          <Back />
        </Page.Header.Left>
        <Page.Header.Center className="text-body-16-regular text-gray-100">
          개인정보 처리방침
        </Page.Header.Center>
      </Page.Header>

      <Page.Container className="pb-24px text-gray-100">
        <PrivacyContent />
      </Page.Container>
    </Page>
  );
}
