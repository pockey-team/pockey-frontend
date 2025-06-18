import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="relative h-[36.8rem] w-full">
      <div className="absolute top-[10rem] right-0px left-0px z-50 lg:top-[6rem]">
        <div className="flex flex-col items-center justify-center gap-8px">
          <h1 className="text-heading-22-semibold md:text-heading-24-semibold lg:text-display-32-semibold">
            고민은 줄이고 마음은 더하게
          </h1>
          <h2 className="text-subtitle-16-semibold md:text-subtitle-18-semibold lg:text-heading-20-semibold">
            수신자 맞춤형 선물 추천 서비스, 포키
          </h2>
        </div>
      </div>
      <div className="relative h-[36.875rem] w-full">
        <Image
          src="/static/landing/hero-gift.svg"
          alt="hero-section"
          className="object-contain"
          fill
          priority
        />
      </div>
    </div>
  );
};
