import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";

const ResultDetailPage = () => {
  return (
    <Page>
      <Page.Header>
        <Page.Header.Left></Page.Header.Left>
        <Page.Header.Right>
          <Button variant="ghost" className="text-gray-400">
            닫기
          </Button>
        </Page.Header.Right>
      </Page.Header>
    </Page>
  );
};

export default ResultDetailPage;
