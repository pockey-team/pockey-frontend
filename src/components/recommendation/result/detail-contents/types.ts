import type { ProductData } from ".";

export interface RecommendationDetailContentsProps {
  showCategory?: boolean;
  showHeart?: boolean;
  showFeelingsSection?: boolean;
  showMessageSection?: boolean;
  showRelatedProductsSection?: boolean;
  relatedProducts?: Array<{ id: number; title: string; imageUrl: string }>;
  showFooterLogo?: boolean;
  showPriceRange?: boolean;
  detailId: string;
  showActionButton?: boolean;
  isCapturing?: boolean;
  isMobile?: boolean;
  name?: string;
  productData?: ProductData;
}
