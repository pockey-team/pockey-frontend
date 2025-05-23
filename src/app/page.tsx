import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPresents } from "@/api/Present/get-presents";
import { BottomBar } from "@/components/layout/bottom-bar";
import { PresentRecommendationContent } from "@/components/present-recommendation-content";
import { Page } from "@/components/shared/page";
import type { Present } from "@/constants/presents";
import { isMobileDevice } from "@/lib/user-agent";
import { cn } from "@/lib/utils";

export default async function Home() {
  const isMobile = await isMobileDevice();
  // const queryClient = await prefetchUserControllerGetUser(
  //   getQueryClient(),
  //   "id:test:server",
  // );
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["presents"],
    queryFn: () =>
      getPresents({
        delay: 1000,
        empty: true,
        error: false,
      }),
  });

  const cachedPresents = queryClient.getQueryData<Present[]>(["presents"]);
  const hasPresents = cachedPresents && cachedPresents.length > 0;
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="overflow-hidden">
      <Page
        className={cn(
          !hasPresents ? "bg-gradient-secondary" : "bg-gradient-primary",
        )}
      >
        <Page.Header>
          <Page.Header.Left>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>
          </Page.Header.Left>
          <Page.Header.Right>
            <Link href="/">
              <Search className="text-white" />
            </Link>
          </Page.Header.Right>
        </Page.Header>

        <Page.Container className="flex-1" noPadding>
          <HydrationBoundary state={dehydratedState}>
            <PresentRecommendationContent isMobile={isMobile} />
          </HydrationBoundary>
        </Page.Container>

        <Page.ActionButton>
          {(props) => <BottomBar {...props} />}
        </Page.ActionButton>
      </Page>
    </div>
  );
}
