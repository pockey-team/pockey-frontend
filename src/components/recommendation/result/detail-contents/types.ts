export interface RecommendationDetailContentsProps {
  showCategory?: boolean;
  showHeart?: boolean;
  showFeelingsSection?: boolean;
  showMessageSection?: boolean;
  showRelatedProductsSection?: boolean;
  productImage?: string;
  productTitle?: string;
  priceRange?: string;
  category1?: string;
  category2?: string;
  feelings?: string[];
  messageTitle?: string;
  messageContent?: string;
  relatedProducts?: Array<{ id: number; title: string; imageUrl: string }>;
  showFooterLogo?: boolean;
  showPriceRange?: boolean;
}
