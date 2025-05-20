import { ResultDetail } from "@/components/recommendation/result/detail";

type Params = Promise<{ id: string }>;

const ResultDetailPage = async ({ params }: { params: Params }) => {
  const param = await params;
  const detailId = param.id;
  return <ResultDetail productId={Number(detailId)} />;
};

export default ResultDetailPage;
