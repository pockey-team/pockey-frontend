import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getResult } from "@/api/recommendation/result/get-result";
import { RecommendationCloseButton } from "@/components/recommendation/close-button";
import { PresentRecommendationResult } from "@/components/recommendation/result/present-recommendation-result";
import { Page } from "@/components/shared/page";

const ResultPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["presents", "recommendation", "result"],
    queryFn: getResult,
  });

  // const cachedData = queryClient.getQueryData(["presents", "recommendation", "result"]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Page>
      <Page.Header>
        <Page.Header.Right>
          {/* TODO. 저장하기 버튼 클릭 시 로그인 이후 해당 상품 상세 페이지로 이동되어야 하므로 상품 ID를 props로 전달 */}
          <RecommendationCloseButton callbackTargetResultId="sample-id" />
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="flex-1">
        <HydrationBoundary state={dehydratedState}>
          <PresentRecommendationResult />
        </HydrationBoundary>
      </Page.Container>
    </Page>
  );
};

export default ResultPage;
