"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getResult } from "@/api/recommendation/result/get-result";
import { RecommendationCard } from "@/components/recommendation/card";
import { SatisfiedButton } from "@/components/recommendation/next-pick/satisfied-button";
import { Button } from "@/components/ui/button";
import { Present } from "@/constants/Presents";

interface ResultResponse {
  result: Present;
  nextPick: Present[];
}

const AVAILABLE_NEXT_PICK_COUNT = 3;
const TOAST_STYLE = {
  backgroundColor: "#202328",
  color: "#fff",
  borderRadius: "32px",
  fontWeight: 700,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  fontSize: "16px",
};

export const ResultContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPickCount, setNextPickCount] = useState(AVAILABLE_NEXT_PICK_COUNT);
  const [showToast, setShowToast] = useState(false);

  // 추후 백엔드 api 연동 시 스웨거 파싱으로 생성된 훅으로 대체될 예정입니다.
  const { data: resultPresents } = useQuery<ResultResponse[]>({
    queryKey: ["presents", "recommendation", "result"],
    queryFn: getResult,
  });

  const displayPresent = resultPresents?.[currentIndex]?.result;
  const displayNextPick = resultPresents?.[currentIndex]?.nextPick;

  const handleNextResult = () => {
    if (resultPresents && currentIndex < resultPresents.length - 1) {
      setCurrentIndex((prev) => (prev + 1) % resultPresents.length);
    }
    setNextPickCount((prev) => Math.max(0, prev - 1));
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      toast.success(
        nextPickCount > 0
          ? `결과를 볼 수 있는 기회가 ${nextPickCount}번 남았어요.`
          : `결과를 볼 수 있는 기회가 없어요.`,
        {
          duration: Infinity,
          id: "next-pick-toast",
          icon: null,
          style: TOAST_STYLE,
        },
      );
      setShowToast(false);
    }
  }, [showToast, nextPickCount]);

  return (
    <>
      <div className="flex flex-col gap-40px">
        <div className="text-center">
          <h1 className="font-bold text-heading-24-semibold">
            <span className="text-primary-500">
              {displayPresent?.receiver}님이
            </span>
            <span className="mt-8px block text-white">
              좋아할 선물을 추천해요
            </span>
          </h1>
        </div>

        <div className="flex items-center justify-center">
          {displayPresent && (
            <RecommendationCard
              present={displayPresent}
              isCurrent={true}
              isResult={true}
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-16px pt-16px pb-52px">
          <div className="flex max-w-[302px] flex-col items-center justify-center gap-4px rounded-2xl bg-[#202228] p-16px">
            <p className="self-start text-body-16-bold text-white">NEXT PICK</p>
            <div className="grid w-full grid-cols-3 gap-[7px]">
              {displayNextPick?.map((item) => (
                <Image
                  key={item.id}
                  src={item.image ?? ""}
                  alt={item.title}
                  width={85}
                  height={85}
                  className="h-[85px] w-[85px] rounded-md object-cover"
                />
              ))}
            </div>
          </div>

          <div className="flex w-full items-center gap-2 gap-8px">
            <SatisfiedButton />
            <Button
              disabled={nextPickCount === 0}
              onClick={handleNextResult}
              variant="ghost"
              className="w-1/2 rounded-xl bg-gray-700 py-20px text-gray-500 text-subtitle-18-bold text-xl tracking-tight hover:bg-gray-700 hover:text-gray-500 focus:bg-gray-700 focus:text-gray-500 active:bg-gray-700 active:text-gray-500"
            >
              별로예요
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
