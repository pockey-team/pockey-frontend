import { Heart } from "lucide-react";
import Image from "next/image";
import { ContentSection } from "@/components/recommendation/result/detail-contents/content-section";
import type { RecommendationDetailContentsProps } from "@/components/recommendation/result/detail-contents/types";
import { RECOMMENDATION_RESULT_DETAIL_CONTENTS } from "@/constants/recommendation-result-detail";
import { cn } from "@/lib/utils";

export const RecommendationDetailContents = ({
  showCategory = true,
  showHeart = true,
  showFeelingsSection = true,
  showMessageSection = true,
  showRelatedProductsSection = true,
  productImage = RECOMMENDATION_RESULT_DETAIL_CONTENTS.productImage,
  productTitle = RECOMMENDATION_RESULT_DETAIL_CONTENTS.productTitle,
  priceRange = RECOMMENDATION_RESULT_DETAIL_CONTENTS.priceRange,
  category1 = RECOMMENDATION_RESULT_DETAIL_CONTENTS.category1,
  category2 = RECOMMENDATION_RESULT_DETAIL_CONTENTS.category2,
  feelings = RECOMMENDATION_RESULT_DETAIL_CONTENTS.feelings,
  messageTitle = RECOMMENDATION_RESULT_DETAIL_CONTENTS.messageTitle,
  messageContent = RECOMMENDATION_RESULT_DETAIL_CONTENTS.messageContent,
  relatedProducts = RECOMMENDATION_RESULT_DETAIL_CONTENTS.relatedProducts,
  showFooterLogo = false,
  showPriceRange = true,
}: RecommendationDetailContentsProps) => {
  return (
    <div
      className={cn(
        "flex h-full min-h-screen flex-col overflow-y-auto",
        showFooterLogo
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100",
      )}
    >
      <Image src={productImage} alt="상품이미지" width={390} height={465} />

      <section className="flex flex-col px-16px pt-24px">
        {showCategory && (
          <nav
            aria-label="카테고리"
            className="flex items-center text-gray-400"
          >
            <ul className="flex items-center">
              <li>{category1}</li>
              {category2 && (
                <>
                  <li aria-hidden="true" className="mx-8px">
                    |
                  </li>
                  <li>{category2}</li>
                </>
              )}
            </ul>
          </nav>
        )}

        <div className="my-12px flex items-start">
          <div className="flex-1">
            <h1 className="font-semibold text-[22px]">{productTitle}</h1>
          </div>
          {showHeart && (
            <div className="flex w-[96px] justify-end">
              <Heart />
            </div>
          )}
        </div>
        {showPriceRange && (
          <p className="text-gray-300 text-subtitle-18-medium">{priceRange}</p>
        )}

        {showFeelingsSection && (
          <ContentSection title="이 선물, 이런 감정을 담았어요">
            <div className="flex flex-wrap gap-8px">
              {feelings.map((feeling) => (
                <div
                  key={feeling}
                  className="max-h-[36px] rounded-xl bg-gray-700 px-16px py-8px text-gray-200"
                >
                  {feeling}
                </div>
              ))}
            </div>
          </ContentSection>
        )}

        {showMessageSection && (
          <ContentSection
            title="이 선물로 전하고 싶은 마음"
            subTitle={messageTitle}
            className={cn(
              showMessageSection && "rounded-3xl bg-[#E5E7EBA1] p-24px",
            )}
            isCapture
          >
            {messageContent}
          </ContentSection>
        )}

        {showRelatedProductsSection && (
          <ContentSection title="함께 보면 좋은 선물">
            <div className="grid grid-cols-3 gap-16px">
              {relatedProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-8px">
                  <Image
                    src={product.imageUrl}
                    alt="상품이미지"
                    width={103}
                    height={103}
                    className="size-[103px] rounded-xl object-cover"
                  />
                  <p className="line-clamp-1">{product.title}</p>
                </div>
              ))}
            </div>
          </ContentSection>
        )}
      </section>
      {showFooterLogo && (
        <div className="flex items-center justify-center">
          <Image
            src="/share/footer-logo.svg"
            alt="footer-logo"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
};
