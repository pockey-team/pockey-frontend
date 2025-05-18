import { ReactNode } from "react";
import { OccasionImage } from "@/components/recommendation/occasion-image";

export type RecommendationSessionOccasionOption = {
  bg: string;
  image: () => ReactNode;
  buttonImageUrl: string;
};

export const occasionOptions: Record<
  string,
  RecommendationSessionOccasionOption
> = {
  thankyou: {
    bg: "bg-[linear-gradient(180deg,#030507_0%,#20093F_100%)]",
    image: OccasionImage.ThankYou,
    buttonImageUrl: "/static/images/recommendation-when-thankyou.png",
  },
  birthday: {
    bg: "bg-[linear-gradient(180deg,#030507_0%,#1A2647_100%)]",
    image: OccasionImage.Birthday,
    buttonImageUrl: "/static/images/recommendation-when-birthday.png",
  },
  congratulation: {
    bg: "bg-[linear-gradient(180deg,#030507_0%,#1F0B21_100%)]",
    image: OccasionImage.Congratulation,
    buttonImageUrl: "/static/images/recommendation-when-congratulation.png",
  },
  sorry: {
    bg: "bg-[linear-gradient(180deg,#030507_0%,#1F0B21_100%)]",
    image: OccasionImage.Sorry,
    buttonImageUrl: "/static/images/recommendation-when-sorry.png",
  },
  support: {
    bg: "bg-[linear-gradient(180deg,#030507_0%,#3C351A_100%)]",
    image: OccasionImage.Support,
    buttonImageUrl: "/static/images/recommendation-when-support.png",
  },
};
