import { ResultDetail } from "@/components/recommendation/result/detail";
import { SummaryDetail } from "@/components/recommendation/summary/detail";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{
  name: string;
  wish?: boolean;
  recommendation?: boolean;
}>;

const ResultDetailPage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const param = await params;
  const searchParam = await searchParams;

  const detailId = param.id;
  const receiverName = searchParam.name;
  const isWishlist = searchParam.wish;

  return (
    <>
      {isWishlist ? (
        <SummaryDetail
          productId={Number(detailId)}
          receiverName={receiverName}
        />
      ) : (
        <ResultDetail
          productId={Number(detailId)}
          receiverName={receiverName}
        />
      )}
    </>
  );
};

export default ResultDetailPage;
