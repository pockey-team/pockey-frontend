import { RecommendationDetailContents } from "@/components/recommendation/result/detail-contents";

type Params = Promise<{ id: string; name: string }>;

export const SharePage = async ({ params }: { params: Params }) => {
  const { id, name } = await params;

  return (
    <RecommendationDetailContents
      showCategory={false}
      showHeart={false}
      showFeelingsSection={false}
      showMessageSection={true}
      showRelatedProductsSection={false}
      showFooterLogo={true}
      showPriceRange={false}
      detailId={id}
      isCapturing={false}
      name={name}
    />
  );
};
