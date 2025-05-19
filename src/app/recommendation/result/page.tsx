import { PresentRecommendationResult } from "@/components/recommendation/result/present-recommendation-result";
import { Page } from "@/components/shared/page";

const ResultPage = () => {
  return (
    <Page>
      <Page.Container className="flex-1">
        <PresentRecommendationResult />
      </Page.Container>
    </Page>
  );
};

export default ResultPage;
