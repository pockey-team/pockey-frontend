"use client";

import { CloverButton } from "@/components/recommendation/clover-button";
import { cn } from "@/lib/utils";

interface Props {
  options: {
    active: boolean;
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
    <div className="grid grid-cols-[auto_2px_auto]">
      <CloverButton
        active={topLeft.active}
        onClick={topLeft.onClick}
        position="top-left"
      >
        {topLeft.label}
      </CloverButton>
      <div className="flex flex-col items-center justify-end pb-[18px]">
        <div
          className={cn(
            "h-[102px] w-[2px] transition-colors",
            topLeft.active || topRight.active
              ? "bg-primary-500"
              : "bg-gray-600",
          )}
        />
      </div>
      <CloverButton
        active={topRight.active}
        onClick={topRight.onClick}
        position="top-right"
      >
        {topRight.label}
      </CloverButton>
      <div className="flex w-full items-center justify-end pr-[18px]">
        <div
          className={cn(
            "h-[2px] w-[102px] transition-colors",
            topLeft.active || bottomLeft.active
              ? "bg-primary-500"
              : "bg-gray-600",
          )}
        />
      </div>
      <div />
      <div className="flex w-full items-center justify-start pl-[18px]">
        <div
          className={cn(
            "h-[2px] w-[102px] transition-colors",
            topRight.active || bottomRight.active
              ? "bg-primary-500"
              : "bg-gray-600",
          )}
        />
      </div>
      <CloverButton
        active={bottomLeft.active}
        onClick={bottomLeft.onClick}
        position="bottom-left"
      >
        {bottomLeft.label}
      </CloverButton>
      <div
        className={cn(
          "mt-[18px] h-[102px] w-[2px] transition-colors",
          bottomLeft.active || bottomRight.active
            ? "bg-primary-500"
            : "bg-gray-600",
        )}
      />
      <CloverButton
        active={bottomRight.active}
        onClick={bottomRight.onClick}
        position="bottom-right"
      >
        {bottomRight.label}
      </CloverButton>
    </div>
  );
};
