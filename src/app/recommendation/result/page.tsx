"use client";

import { redirect } from "next/navigation";
import { RecommendationCloseButton } from "@/components/recommendation/close-button";
import { PresentRecommendationResult } from "@/components/recommendation/result/present-recommendation-result";
import { Page } from "@/components/shared/page";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import { getSessionResultStorageKey } from "@/utils/recommendation";

const ResultPage = () => {
  const { name, sessionId = "default" } = useSearchParamsObject<{
    name: string;
    sessionId?: string;
  }>();

  const items = JSON.parse(
    window.sessionStorage.getItem(getSessionResultStorageKey(sessionId)) ||
      "[]",
  );

  if (!name || !items || !Array.isArray(items)) {
    return redirect("/");
  }

  return (
    <Page>
      <Page.Header>
        <Page.Header.Right>
          {/* TODO. 저장하기 버튼 클릭 시 로그인 이후 해당 상품 상세 페이지로 이동되어야 하므로 상품 ID를 props로 전달 */}
          <RecommendationCloseButton callbackTargetResultId="sample-id" />
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="flex-1">
        <PresentRecommendationResult name={name} items={items} />
      </Page.Container>
    </Page>
  );
};

export default ResultPage;
