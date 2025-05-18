"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  item: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem;
  isCurrent: boolean;
  isResult?: boolean;
}

export const RecommendationCard = ({
  item,
  isCurrent,
  isResult = false,
}: RecommendationCardProps) => {
  return (
    <Link href={`/recommendation/result/${item.product.id}`}>
      <div
        className={cn(
          "scale-100 bg-gray-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
          "h-[404px] w-[292px] cursor-pointer select-none rounded-2xl p-4 ",
        )}
      >
        <motion.div
          className="flex flex-col overflow-hidden p-24px text-black"
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="flex flex-col gap-12px">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200">
              <Image
                className="object-cover"
                src={item.product.imageUrl || ""}
                alt={item.product.name}
                fill
                priority
              />

              {/* {isResult && (
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button
                  variant="ghost"
                  className="rounded-lg bg-white/80 px-2 py-1 font-medium text-xs shadow backdrop-blur"
                >
                  저장
                </Button>
                <ShareButton />
              </div>
            )} */}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isCurrent ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="mt-16px flex flex-col"
          >
            <p className="line-clamp-1 text-subtitle-18-bold">
              {item.product.name}
            </p>
            {!isResult && (
              <div className="flex flex-col">
                <p className="py-4px font-semibold text-[#4DA6FF]">
                  {item.minifiedReason}
                </p>
                <div className="w-fit rounded-md bg-[#6D8FFF] px-4px py-[3px] font-bold text-white">
                  인기 TOP 10
                </div>
              </div>
            )}
            <p className="line-clamp-1 self-end pt-12px text-subtitle-18-semibold">
              {item.product.priceRange}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Link>
  );
};
