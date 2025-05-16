import { ReactNode } from "react";
import { WhenImage } from "@/components/recommendation/setup/when-image";

export type RecommendationSetupWhenOption = {
  key: string;
  bg: string;
  image: () => ReactNode;
  buttonImageUrl: string;
  title: (name: string) => ReactNode;
  label: string;
};

export const OPTIONS: RecommendationSetupWhenOption[] = [
  {
    key: "thx",
    bg: "bg-[linear-gradient(180deg,#030507_0%,#20093F_100%)]",
    image: WhenImage.Thx,
    buttonImageUrl: "/static/images/recommendation-when-thx.png",
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
    image: WhenImage.Birthday,
    buttonImageUrl: "/static/images/recommendation-when-birthday.png",
    title: (name: string) => (
      <>
        <span className="text-primary-500">{name}</span>님의 행복한 생일이에요!
      </>
    ),
    label: "생일이에요",
  },
  {
    key: "congrat",
    bg: "bg-[linear-gradient(180deg,#030507_0%,#1F0B21_100%)]",
    image: WhenImage.Congrat,
    buttonImageUrl: "/static/images/recommendation-when-congrat.png",
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
    image: WhenImage.Sorry,
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
    key: "fighting",
    bg: "bg-[linear-gradient(180deg,#030507_0%,#3C351A_100%)]",
    image: WhenImage.Fighting,
    buttonImageUrl: "/static/images/recommendation-when-fighting.png",
    title: (name: string) => (
      <>
        <span className="text-primary-500">{name}</span>님을 응원해요
      </>
    ),
    label: "응원해요",
  },
];
