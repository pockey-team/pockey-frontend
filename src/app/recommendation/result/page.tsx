import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getResult } from "@/api/recommendation/result/get-result";
import { ResultContent } from "@/components/recommendation/result/result-content";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";

const ResultPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["presents", "recommendation", "result"],
    queryFn: getResult,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Page className="bg-gray-900">
      <Page.Header>
        <Page.Header.Left></Page.Header.Left>
        <Page.Header.Right>
          <Button variant="ghost" className="text-gray-400">
            닫기
          </Button>
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="overflow-y-auto">
        <HydrationBoundary state={dehydratedState}>
          <ResultContent />
        </HydrationBoundary>
      </Page.Container>
    </Page>
  );
};

export default ResultPage;
