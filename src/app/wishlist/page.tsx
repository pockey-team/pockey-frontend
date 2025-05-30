import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { wishlistControllerGetWishlistGroups } from "@/api/__generated__";
import { BottomBar } from "@/components/layout/bottom-bar";
import { Page } from "@/components/shared/page";
import { SummaryCardSection } from "@/components/wishlist/summary-card-section";
import { authOptions } from "@/lib/auth";

type SearchParams = Promise<{ receiver: string }>;

const WishlistPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const queryClient = new QueryClient();

  const searchParam = await searchParams;
  const receiverName = searchParam.receiver;

  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryKey: ["wishlistSummary"],
    queryFn: () =>
      wishlistControllerGetWishlistGroups({
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Page className="flex min-h-screen select-none flex-col bg-gray-900">
      <Page.Header>
        <Page.Header.Left>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={91} height={24} priority />
          </Link>
        </Page.Header.Left>
      </Page.Header>
      <HydrationBoundary state={dehydratedState}>
        <SummaryCardSection session={session} receiverName={receiverName} />
      </HydrationBoundary>
      <Page.ActionButton>
        {(props) => <BottomBar {...props} />}
      </Page.ActionButton>
    </Page>
  );
};

export default WishlistPage;
