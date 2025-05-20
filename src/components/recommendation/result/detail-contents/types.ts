interface ProductData {
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
