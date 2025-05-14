export interface Present {
  id: string;
  type?: "add" | "default";
  title: string;
  content?: string | null;
  price?: string;
  description?: string;
  image?: string;
  receiver?: string;
}

export const PRESENTS: Present[] = [
  {
    id: "1",
    type: "default",
    title: "생일 선물이에요",
    content: "프래그런스 샤쉐",
    price: "3만원대",
    description:
      "싱그러운 봄 향기를 담은 프래그런스 샤쉐입니다. 은은하고 포근한 향이 공간을 감싸며 일상에 상쾌함을 더해줍니다. 옷장, 차량, 침실 등 다양한 곳에 걸어두어 특별한 분위기를 연출해보세요. 선물용으로도 탁월한 선택입니다.",
    image: "/recommendation/fragrance.webp",
    receiver: "김포키",
  },
  {
    id: "2",
    type: "default",
    title: "생일 선물이에요",
    content: "에어팟 맥스",
    price: "70만원대",
    description:
      "모던한 디자인과 편안한 착용감, 뛰어난 음질의 스테레오 사운드로 완벽한 음악 경험을 선사해주는 에어팟 맥스",
    image: "/present.svg",
    receiver: "민수",
  },
  {
    id: "3",
    type: "default",
    title: "생일 선물이에요",
    content: "렉슨 루마 L",
    price: "12만원대",
    description:
      "렉슨 루마 L은 집들이 결혼 선물로 인기있는 고급스러운 디자인의 아이템으로 실용성과 감각을 동시에 선물할 수 있습니다.",
    image: "/recommendation/lexon.webp",
    receiver: "정민",
  },
];
