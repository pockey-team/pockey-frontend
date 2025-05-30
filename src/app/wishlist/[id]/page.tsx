import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { wishlistControllerGetWishlistsByReceiverName } from "@/api/__generated__";
import { BottomBar } from "@/components/layout/bottom-bar";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { SummaryDetailCardSection } from "@/components/wishlist/summary-detail-card-section";
import { authOptions } from "@/lib/auth";

type SearchParams = Promise<{ receiver: string }>;

const WishlistDetailPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const queryClient = new QueryClient();

  const searchParam = await searchParams;
  const receiverName = searchParam.receiver;

  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryKey: ["wishlistByReceiverName", receiverName],
    queryFn: () =>
      wishlistControllerGetWishlistsByReceiverName(
        {
          receiverName,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      ),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Page className="h-dvh select-none bg-gray-900">
      <Page.Header>
        <Page.Header.Left>
          <Back />
        </Page.Header.Left>
      </Page.Header>
      <div className="relative flex-1 overflow-auto">
        <Page.Container className="pb-40px">
          <HydrationBoundary state={dehydratedState}>
            <SummaryDetailCardSection
              receiverName={receiverName}
              session={session}
            />
          </HydrationBoundary>
        </Page.Container>
      </div>
      <Page.ActionButton>
        {(props) => <BottomBar {...props} />}
      </Page.ActionButton>
    </Page>
  );
};

export default WishlistDetailPage;
