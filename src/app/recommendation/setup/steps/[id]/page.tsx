import Link from "next/link";
import { Back } from "@/components/shared/back";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";

export default function RecommendationSetupStepPage() {
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

      <Page.Container className="mt-[104px]">
        <p className="mb-16px text-center text-gray-500 text-subtitle-2">1/4</p>
        <Page.Title className="text-gray-100">성별을 알려주세요</Page.Title>
      </Page.Container>

      <Page.Container className="flex flex-grow flex-col justify-center pb-[208px]">
        <div className="grid grid-cols-2 gap-16px">
          <Button size="medium" variant="contained">
            남자
          </Button>
          <Button size="medium" variant="contained">
            여자
          </Button>
        </div>
      </Page.Container>
    </Page>
  );
}
