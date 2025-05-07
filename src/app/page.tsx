import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Search, Star, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPresents } from "@/api/Present/get-presents";
import { FooterToggle } from "@/components/Layout/footer-toggle";
import { PresentRecommendationContent } from "@/components/present-recommendation-content";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import type { Present } from "@/constants/Presents";
import { cn } from "@/lib/utils";

export default async function Home() {
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
    <Page
      className={cn(
        !hasPresents
          ? "from-[#121133] to-[#6077A9]"
          : "from-[#4F76C5] to-[#D7ECFF]",
        "bg-gradient-to-b",
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
        <PresentRecommendationContent
          hasPresents={hasPresents}
          dehydratedState={dehydratedState}
        />
      </Page.Container>

      <Page.ActionButton>
        {(props) => (
          <div className="flex w-full items-center justify-between gap-2">
            <Button
              {...props}
              variant="ghost"
              className="text-black hover:bg-transparent"
            >
              <Star fill="#d1d5db" stroke="#d1d5db" strokeWidth={1.5} />
            </Button>
            <FooterToggle />
            <Button
              {...props}
              variant="ghost"
              className="text-black hover:bg-transparent"
            >
              <UserRound fill="#d1d5db" stroke="#d1d5db" strokeWidth={1.5} />
            </Button>
          </div>
        )}
      </Page.ActionButton>
    </Page>
  );
}
