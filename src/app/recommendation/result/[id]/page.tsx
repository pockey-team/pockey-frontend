import { RecommendationDetailContents } from "@/components/recommendation/result/detail-contents";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";

const ResultDetailPage = ({ params }: { params: { id: string } }) => {
  const detailId = params.id;
  return (
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
            <RecommendationDetailContents
              detailId={detailId}
              showActionButton
            />
          </Page.Container>
        </div>
      </div>
    </Page>
  );
};

export default ResultDetailPage;
