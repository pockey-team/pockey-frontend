import { productControllerGetProduct } from "@/api/__generated__/index";
import { RecommendationDetailContents } from "@/components/recommendation/result/detail-contents";
import { Page } from "@/components/shared/page";

type Params = Promise<{ id: string; name: string }>;

export interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
  priceRange: string;
  ageRange: string | string[];
  category: string | string[];
  friendshipLevel: string[] | string;
  intention: string[] | string;
  situation: string[] | string;
  tags: string[] | string;
  targetGender?: string;
  brand?: string | null;
  nextPickProductIds?: number[] | null;
  price?: number | null;
}

const SharePage = async ({ params }: { params: Params }) => {
  const { id, name } = await params;
  const productId = Number(id);

  try {
    const response = await productControllerGetProduct(productId);
    // 응답에서 실제 데이터 추출
    const productData = response.data as unknown as ProductData;

    return (
      <Page className="px-0px">
        <Page.Container className="flex-1">
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
            productData={productData}
          />
        </Page.Container>
      </Page>
    );
  } catch (error) {
    console.error("상품 정보 가져오기 실패:", error);
    return (
      <Page>
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="mb-4 font-bold text-xl">
            상품 정보를 불러올 수 없습니다
          </h1>
          <p>다시 시도해 주세요.</p>
        </div>
      </Page>
    );
  }
};

export default SharePage;
