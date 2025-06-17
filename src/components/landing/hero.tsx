import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative flex min-h-[800px] w-full flex-col items-center justify-center bg-[#141214] pt-[60px]">
      <h1 className="text-heading-22-semibold md:text-heading-24-semibold lg:text-display-32-semibold">
        고민은 줄이고 마음은 더하게
      </h1>
      <h2 className="text-subtitle-16-semibold md:text-subtitle-18-semibold lg:text-heading-20-semibold">
        수신자 맞춤형 선물 추천 서비스, 포키
      </h2>
      <div className="relative min-h-[456px] w-full">
        <Image
          src="/static/landing/hero-gift.svg"
          alt="hero-section"
          fill
          priority
        />
        <div className="absolute right-0px bottom-[80px] left-0px flex justify-center sm:bottom-0px">
          <Button
            asChild
            className="hover:!bg-primary-500/80 !text-gray-900 !rounded-md h-[50px] w-[280px] bg-primary-500 sm:h-52px sm:w-[358px]"
          >
            <Link href="/find">선물 찾으러 가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
