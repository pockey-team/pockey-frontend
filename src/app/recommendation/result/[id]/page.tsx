import { ResultDetail } from "@/components/recommendation/result/detail";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ name: string }>;

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
  return (
    <ResultDetail productId={Number(detailId)} receiverName={receiverName} />
  );
};

export default ResultDetailPage;
