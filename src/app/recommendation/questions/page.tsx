"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";

export default function RecommendationQuestionsPage() {
  const router = useRouter();

  const title = "친구에게 '여행'은 어떤 의미일까요?";
  const options = [
    { id: "1", label: "일상을 벗어나 자유를 느끼는 시간" },
    { id: "2", label: "낯선 곳에서 자신을 새롭게 발견하는 기회" },
    { id: "3", label: "새로운 사람과 문화를 만나는 설렘" },
    { id: "4", label: "좋아하는 사람과 함께라 더 특별한 순간" },
  ];

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <div className="mx-auto flex h-full w-full max-w-md flex-col">
        <header className="relative flex justify-between px-4 py-4 align-center">
          <Button
            type="button"
            className="rounded bg-gray-800 px-2 text-sm text-white hover:bg-gray-700"
            onClick={() => router.back()}
          >
            뒤로
          </Button>
          <Button
            variant="ghost"
            className="px-2 text-gray-500 hover:bg-gray-900 hover:text-gray-400"
            onClick={() => router.push("/")}
          >
            닫기
          </Button>
        </header>
        <main className="flex flex-grow flex-col px-4 pb-14">
          <div className="flex flex-col items-center justify-center">
            {/* image */}
            <Image
              src="/static/images/recommendation-questions-calendar.png"
              alt="Calendar"
              width={150}
              height={150}
              priority
            />
            {/* title */}
            <h2 className="mb-6 w-full max-w-64 break-keep text-center font-bold text-2xl text-white">
              {title}
            </h2>
            {/* progress bar */}
            <div className="mb-6 h-1 w-full bg-green-300"></div>
          </div>

          <div className="grid h-full max-h-[36rem] w-full grid-cols-2 grid-rows-2 gap-4 ">
            {options.map(({ id, label }) => (
              <OptionCard key={id}>{label}</OptionCard>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const OptionCard = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick?: () => void }>) => {
  return (
    <Button
      type="button"
      className="h-full items-center justify-center text-wrap break-keep rounded-xl bg-gray-300 p-10 text-center text-gray-800 transition-colors hover:bg-gray-400"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
