"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  item: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem;
  isCurrent: boolean;
  isResult?: boolean;
  className?: string;
}

export const RecommendationCard = ({
  item,
  isCurrent,
  isResult = false,
  className,
}: RecommendationCardProps) => {
  return (
    <div
      className={cn(
        "scale-100 bg-gray-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
        "h-[424px] w-[292px] cursor-pointer select-none rounded-2xl p-4 ",
        className,
      )}
    >
      <motion.div
        className="flex flex-col overflow-hidden p-24px text-black"
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex flex-col">
          <div className="relative aspect-square h-[234px] w-full overflow-hidden rounded-xl bg-gray-200">
            <Image
              className="object-cover"
              src={item.product.imageUrl || ""}
              alt={item.product.name}
              fill
              priority
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isCurrent ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.3 }}
          className="mt-16px flex h-[126px] flex-col"
        >
          <div className="flex-1">
            <p className="line-clamp-2 break-keep text-start text-heading-20-semibold">
              {item.product.name}
            </p>

            {isResult && (
              <p className="line-clamp-1 h-24px overflow-hidden break-keep py-4px text-start font-semibold text-[#709DFF] text-body-14-semibold">
                {item.minifiedReason}
              </p>
            )}
          </div>
          <div className="mt-8px flex h-[30px] items-center justify-between border-gray-300 border-t pt-8px text-body-16-regular">
            <p className="text-gray-400">금액</p>
            <p className="line-clamp-1 self-end text-gray-600">
              {item.product.priceRange}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
