import { RecommendationDetailContents } from "@/components/recommendation/result/detail-contents";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";

const ResultDetailPage = () => {
  return (
    <div className="grid h-screen grid-rows-[1fr_auto] overflow-hidden bg-gray-900">
      <Page className="flex flex-col bg-gray-900">
        <div className="relative overflow-auto">
          <Page.Header className="absolute top-0 right-0 left-0 z-30">
            <Page.Header.Left>
              <Back />
            </Page.Header.Left>
            <Page.Header.Right>
              <Button variant="ghost" className="text-gray-400">
                닫기
              </Button>
            </Page.Header.Right>
          </Page.Header>

          <div className="flex-1 overflow-auto">
            <Page.Container className="pt-0" noPadding>
              <RecommendationDetailContents />
            </Page.Container>
          </div>
        </div>

        <div className="z-20 border-gray-800 border-t bg-gray-900">
          <Page.ActionButton className="mt-0 mb-0 bg-gray-900">
            {() => (
              <div className="flex items-center gap-12px">
                <Button className="!text-gray-700 !rounded-2xl w-1/2 bg-primary-500 py-16px text-subtitle-18-bold">
                  구매하기
                </Button>
                <Button className="!rounded-2xl w-1/2 py-16px">공유하기</Button>
              </div>
            )}
          </Page.ActionButton>
        </div>
      </Page>
    </div>
  );
};

export default ResultDetailPage;
