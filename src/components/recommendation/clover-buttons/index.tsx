"use client";

import { motion } from "framer-motion";
import { CloverButton } from "@/components/recommendation/clover-button";
import { cn } from "@/lib/utils";

interface Props {
  options: {
    active: boolean;
    selected: boolean;
    label: string;
    onClick: () => void;
  }[];
}

export const CloverButtons = ({ options }: Props) => {
  if (options.length !== 4) {
    throw new Error("options must be 4");
  }

  const [topLeft, topRight, bottomLeft, bottomRight] = options;

  return (
    <div className="grid grid-cols-[50%_2px_50%]">
      <CloverButton
        active={topLeft.active}
        selected={topLeft.selected}
        onClick={topLeft.onClick}
        position="top-left"
      >
        {topLeft.label}
      </CloverButton>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center justify-end pb-[18px]"
      >
        <div
          className={cn(
            "h-[102px] w-[2px] transition-colors",
            !topLeft.selected &&
              !topRight.selected &&
              (topLeft.active || topRight.active)
              ? "bg-gray-600"
              : "bg-gray-700",
          )}
        />
      </motion.div>
      <CloverButton
        active={topRight.active}
        selected={topRight.selected}
        onClick={topRight.onClick}
        position="top-right"
      >
        {topRight.label}
      </CloverButton>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex w-full items-center justify-end pr-[18px]"
      >
        <div
          className={cn(
            "h-[2px] w-[102px] transition-colors",
            !topLeft.selected &&
              !bottomLeft.selected &&
              (topLeft.active || bottomLeft.active)
              ? "bg-gray-600"
              : "bg-gray-700",
          )}
        />
      </motion.div>
      <div />
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex w-full items-center justify-start pl-[18px]"
      >
        <div
          className={cn(
            "h-[2px] w-[102px] transition-colors",
            !bottomLeft.selected &&
              !bottomRight.selected &&
              (topRight.active || bottomRight.active)
              ? "bg-gray-600"
              : "bg-gray-700",
          )}
        />
      </motion.div>
      <CloverButton
        active={bottomLeft.active}
        selected={bottomLeft.selected}
        onClick={bottomLeft.onClick}
        position="bottom-left"
      >
        {bottomLeft.label}
      </CloverButton>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "mt-[18px] h-[102px] w-[2px] transition-colors",
          !topRight.selected &&
            !bottomRight.selected &&
            (bottomLeft.active || bottomRight.active)
            ? "bg-gray-600"
            : "bg-gray-700",
        )}
      />
      <CloverButton
        active={bottomRight.active}
        selected={bottomRight.selected}
        onClick={bottomRight.onClick}
        position="bottom-right"
      >
        {bottomRight.label}
      </CloverButton>
    </div>
  );
};
