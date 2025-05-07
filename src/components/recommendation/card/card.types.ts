import { Present } from "@/constants/Presents";

export interface RecommendationCardProps {
  present: Present;
  isCurrent: boolean;
  isResult?: boolean;
}
