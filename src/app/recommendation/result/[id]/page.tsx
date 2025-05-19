import { RecommendationDetailContents } from "@/components/recommendation/result/detail-contents";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { isMobileDevice } from "@/lib/user-agent";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ name: string }>;

const ResultDetailPage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const param = await params;
  const detailId = param.id;
  const isMobile = await isMobileDevice();
  const searchParam = await searchParams;
  const name = searchParam.name;
  return (
    <Page className="relative flex flex-col bg-gray-900">
      <div className="relative size-full">
        <div className="absolute z-50 h-52px w-full">
          <Page.Header>
            <Page.Header.Left>
              <Back />
            </Page.Header.Left>
            <Page.Header.Right>
              <Button
                variant="ghost"
                className="rounded-2xl bg-gray-200/80 p-4px text-gray-700"
              >
                닫기
              </Button>
            </Page.Header.Right>
          </Page.Header>
        </div>

        <div className="absolute top-0px right-0px left-0px z-30 flex-1 overflow-auto">
          <Page.Container className="pt-0" noPadding>
            <RecommendationDetailContents
              detailId={detailId}
              isMobile={isMobile}
              name={name}
              showActionButton
            />
          </Page.Container>
        </div>
      </div>
    </Page>
  );
};

export default ResultDetailPage;
