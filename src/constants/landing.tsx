interface Step {
  stepNumber: number;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
}

export const STEPS: Step[] = [
  {
    stepNumber: 1,
    title: (
      <>
        마음을 전할 사람에
        <br /> 대해 알려주세요
      </>
    ),
    description: (
      <>
        성별, 연령, 관계, 예산, 상황을 선택하여 <br /> 선물 추천에 필요한 핵심
        조건을 자동 설정해요.
      </>
    ),
    image: "/static/landing/step1.svg",
  },
  {
    stepNumber: 2,
    title: (
      <>
        그 사람을 떠올리며 <br /> 질문에 답해주세요
      </>
    ),
    description: (
      <>
        LLM이 사용자의 답변을 바탕으로 추가 질문과 선택지를
        <br />
        생성하고, 답변을 분석하여 어울리는 선물을 추천해요.
      </>
    ),
    image: "/static/landing/step2.svg",
  },
  {
    stepNumber: 3,
    title: (
      <>
        그 사람이 좋아할 <br />
        선물을 준비했어요
      </>
    ),
    description: (
      <>
        선물 추천 이유를 통해 해당 선물이
        <br />
        상대와 어울리는지 파악할 수 있어요.
      </>
    ),
    image: "/static/landing/step3.svg",
  },
];
