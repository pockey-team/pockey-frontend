import { ReactNode } from "react";
import { OccasionImage } from "@/components/recommendation/session/occasion-image";

export type RecommendationSessionOccasionOption = {
  key: string;
  bg: string;
  image: () => ReactNode;
  buttonImageUrl: string;
  title: (name: string) => ReactNode;
  label: string;
};

export const OPTIONS: RecommendationSessionOccasionOption[] = [
  {
    key: "thankyou",
    bg: "bg-[linear-gradient(180deg,#030507_0%,#20093F_100%)]",
    image: OccasionImage.ThankYou,
    buttonImageUrl: "/static/images/recommendation-when-thankyou.png",
    title: (name: string) => (
      <>
        <span className="text-primary-500">{name}</span>님께 고마운 마음을
        전해요
      </>
    ),
    label: "고마워요",
  },
  {
    key: "birthday",
    bg: "bg-[linear-gradient(180deg,#030507_0%,#1A2647_100%)]",
    image: OccasionImage.Birthday,
    buttonImageUrl: "/static/images/recommendation-when-birthday.png",
    title: (name: string) => (
      <>
        <span className="text-primary-500">{name}</span>님의 행복한 생일이에요!
      </>
    ),
    label: "생일이에요",
  },
  {
    key: "congratulation",
    bg: "bg-[linear-gradient(180deg,#030507_0%,#1F0B21_100%)]",
    image: OccasionImage.Congratulation,
    buttonImageUrl: "/static/images/recommendation-when-congratulation.png",
    title: (name: string) => (
      <>
        <span className="text-primary-500">{name}</span>님에게 기쁜 마음을
        전해요
      </>
    ),
    label: "기뻐요",
  },
  {
    key: "sorry",
    bg: "bg-[linear-gradient(180deg,#030507_0%,#1F0B21_100%)]",
    image: OccasionImage.Sorry,
    buttonImageUrl: "/static/images/recommendation-when-sorry.png",
    title: (name: string) => (
      <>
        <span className="text-primary-500">{name}</span>님에게 미안한 마음을
        전해요
      </>
    ),
    label: "미안한 마음",
  },
  {
    key: "support",
    bg: "bg-[linear-gradient(180deg,#030507_0%,#3C351A_100%)]",
    image: OccasionImage.Support,
    buttonImageUrl: "/static/images/recommendation-when-support.png",
    title: (name: string) => (
      <>
        <span className="text-primary-500">{name}</span>님을 응원해요
      </>
    ),
    label: "응원해요",
  },
];
