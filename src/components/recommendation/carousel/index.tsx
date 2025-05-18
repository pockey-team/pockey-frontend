"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { RecommendationCard } from "@/components/recommendation/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearchParamsObject } from "@/hooks/useSearchParamsObject";
import {
  getRotation,
  getSessionResultStorageKey,
} from "@/utils/recommendation";

export const RecommendationCarousel = () => {
  const { name, sessionId = "default" } = useSearchParamsObject<{
    name: string;
    sessionId?: string;
  }>();

  const items = JSON.parse(
    window.sessionStorage.getItem(getSessionResultStorageKey(sessionId)) ||
      "[]",
  ) as RecommendSessionControllerSubmitAnswer201OneOfOneoneItem[];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "center",
          slidesToScroll: 1,
          containScroll: false,
          startIndex: 0,
        }}
      >
        <CarouselContent className="-ml-0">
          {items?.map((item, index) => (
            <div
              key={item.product.id}
              className="flex flex-col items-center gap-32px"
            >
              <div className="pl-32px">
                <div className="flex h-40px min-w-[125px] items-center justify-center rounded-full bg-white px-16px py-12px font-bold text-[#4C90FE] text-body-16-bold">
                  {name} | 3개 선물
                </div>
              </div>
              <CarouselItem className="basis-4/5 pl-32px md:basis-3/4 lg:basis-3/5">
                <motion.div
                  animate={{
                    rotate: getRotation({ index, current }),
                    scale: current === index ? 1 : 0.95,
                    opacity: Math.abs(current - index) > 1 ? 0.7 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="h-full"
                >
                  <RecommendationCard
                    item={item}
                    isCurrent={current === index}
                  />
                </motion.div>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>

        <div className="hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};
