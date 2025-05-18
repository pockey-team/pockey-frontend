import { Page } from "@/components/shared/page";

export const TitleSection = () => {
  return (
    <Page.Title className="desktop:mt-[60px]">
      <span className="text-primary-500">포키님이</span>
      <span className="mt-8px block text-white">좋아할 선물을 추천해요</span>
    </Page.Title>
  );
};
