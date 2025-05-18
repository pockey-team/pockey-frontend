import type { Present } from "@/constants/presents";

export interface RecommendationCardProps {
  present: Present;
  isCurrent: boolean;
  isResult?: boolean;
}
