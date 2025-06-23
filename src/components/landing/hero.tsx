export const HeroSection = () => {
  return (
    <div className="relative top-[5.2rem] flex max-h-[28.5rem] flex-col items-center sm:top-[1.2rem]">
      <div className="absolute top-[6.5rem] z-50 sm:top-[3rem]">
        <div className="flex flex-col items-center justify-center gap-8px">
          <h1 className="md:text1-heading-24-semibold text-heading-22-semibold lg:text-display-32-semibold">
            고민은 줄이고 마음은 더하게
          </h1>
          <h2 className="text-subtitle-16-semibold md:text-subtitle-18-semibold lg:text-heading-20-semibold">
            수신자 맞춤형 선물 추천 서비스, 포키
          </h2>
        </div>
      </div>
      <div className="relative">
        {/** biome-ignore lint/performance/noImgElement: next/image 사용 시 발생하는 화질 저하 문제 해결을 위해 img 태그 사용 */}
        <img
          src="/static/landing/hero-gift.png"
          alt="step-image"
          className="h-[28.5rem] object-contain md:h-[32rem] lg:h-[36.875rem]"
          loading="lazy"
        />
        <div className="absolute top-0px left-0px h-20px w-full bg-gradient-to-b from-gray-900 to-transparent" />
        <div className="absolute bottom-0px left-0px h-20px w-full bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
    </div>
  );
};
