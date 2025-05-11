import { RecommendationSetupFormData } from "@/types/recommendation/setup";

export type RecommendationSetupQuestion = {
  id: number;
  name: keyof RecommendationSetupFormData;
  title: (name: string) => string;
  options: {
    label: string;
    value: string;
  }[];
};

export const QUESTIONS: RecommendationSetupQuestion[] = [
  {
    id: 1,
    name: "gender",
    title: (name: string) => `${name}님의 성별은 어떻게 되나요?`,
    options: [
      { label: "남자", value: "male" },
      { label: "여자", value: "female" },
    ],
  },
  {
    id: 2,
    name: "age",
    title: (name: string) => `${name}님의 연령대를 알려주세요`,
    options: [
      { label: "10대", value: "10s" },
      { label: "20대", value: "20s" },
      { label: "30대", value: "30s" },
      { label: "40대", value: "40s" },
      { label: "50대", value: "50s" },
      { label: "60대", value: "60s" },
    ],
  },
  {
    id: 3,
    name: "relation",
    title: (name: string) => `${name}님과 어떤 사이인가요?`,
    options: [
      { label: "부모님", value: "parent" },
      { label: "친구", value: "friend" },
      { label: "연인", value: "lover" },
      { label: "동료", value: "colleague" },
      { label: "상사", value: "boss" },
      { label: "선생님", value: "teacher" },
    ],
  },
  {
    id: 4,
    name: "priceRange",
    title: () => `어떤 가격대의 선물을 준비할까요?`,
    options: [
      { label: "1만 원", value: "10000" },
      { label: "2만 원", value: "20000" },
      { label: "3만 원", value: "30000" },
      { label: "4-6만 원", value: "40000-60000" },
      { label: "7-9만 원", value: "70000-90000" },
      { label: "10만 원", value: "100000" },
      { label: "20만 원", value: "200000" },
      { label: "30만 원", value: "300000" },
    ],
  },
];
