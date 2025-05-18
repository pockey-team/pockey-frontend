const FEELINGS = ["편안함", "실용적임", "현대적임", "기술적 감성", "안락함"];

export const RECOMMENDATION_RESULT_DETAIL_CONTENTS = {
  productImage: "/recommendation/sample.svg",
  productTitle: "뮤란드 맥세이프 5 IN 1 무드등 무선충전기",
  priceRange: "4-6만원대",
  category1: "리빙/라이프 스타일",
  category2: "기술/가전",
  feelings: FEELINGS,
  messageTitle: "바쁜 하루를 마친 후 손끝에 잔잔한 위로를",
  messageContent:
    "홍길동님께서는 30대 남성으로, 힘든 시기에 도움을 주셨던 소중한 기억이 있습니다. \"필요하면 도와줄게요'라는 따뜻한 마음을 전하고 싶어 하시는 만큼 이 향기는 바쁜 하루를 마친 후 손끝에 잔잔한 위로를 전할 수 있어요 손끝에 잔잔한 위로를 전할 수 있어요 글자수채워요",
  relatedProducts: [1, 2, 3].map((id) => ({
    id,
    title: "뮤란드 맥세이프 5 IN 1 무드등 무선충전기",
    imageUrl: "/recommendation/sample.svg",
  })),
};
