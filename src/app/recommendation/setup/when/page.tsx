import Link from "next/link";
import { Back } from "@/components/shared/back";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";

export default function RecommendationSetupWhenPage() {
  return (
    <Page className="bg-gray-800">
      <Page.Header>
        <Page.Header.Left>
          <Back />
        </Page.Header.Left>
        <Page.Header.Right>
          <Link href="/" className="text-body-2 text-gray-500">
            닫기
          </Link>
        </Page.Header.Right>
      </Page.Header>

      <Page.Container>
        <Page.Title className="mt-48px text-gray-100">
          언제 선물하고자 하나요?
        </Page.Title>
      </Page.Container>

      <Page.ActionButton>
        {(props) => (
          <Button {...props} size="x-large" aria-selected={true}>
            선물 고르기
          </Button>
        )}
      </Page.ActionButton>
    </Page>
  );
}
