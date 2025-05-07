import { QueryClient } from "@tanstack/react-query";
import { getPresents } from "@/api/Present/get-presents";
import { RecommendationCard } from "@/components/recommendation/card";
import { Button } from "@/components/ui/button";
import { Present } from "@/constants/Presents";

const ResultPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["presents", "recommendation", "result"],
    queryFn: () =>
      getPresents({
        empty: false,
        error: false,
      }),
  });

  const cachedPresents = queryClient.getQueryData<Present[]>([
    "presents",
    "recommendation",
    "result",
  ]);
  const resultPresent = cachedPresents?.[0];

  return (
    <main className="relative flex h-dvh flex-col items-center justify-center gap-8">
      <h1 className="text-center font-bold text-2xl">
        <span className="text-[#C9DAFF]">포키</span>님이
        <br />
        좋아할 선물을 추천해요
      </h1>

      <div className="flex items-center justify-center">
        <RecommendationCard
          present={resultPresent as Present}
          isCurrent={true}
          isResult={true}
        />
      </div>

      <div className="flex w-full items-center gap-2">
        <Button className="w-1/2 rounded-xl bg-[#C0DAFF] py-8 font-bold text-xl tracking-tight hover:bg-[#C0DAFF]/80">
          마음에 들어요
        </Button>
        <Button
          variant="ghost"
          className="w-1/2 rounded-xl border bg-background py-8 font-bold text-foreground text-xl tracking-tight"
        >
          별로예요
        </Button>
      </div>

      <div className="flex w-full flex-col gap-2 rounded-xl bg-[#202228] p-4">
        <p className="font-bold tracking-tight">NEXT PICK's</p>
        <div className="flex items-center gap-4 overflow-x-auto">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`item-${index}-${Date.now()}`}
              className="size-20 shrink-0 rounded-xl bg-slate-300"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
