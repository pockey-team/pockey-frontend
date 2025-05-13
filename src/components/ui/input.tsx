import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  cn(
    "w-full px-16px py-[15px] rounded-[12px] bg-gray-700 text-gray-100 text-subtitle-18-bold",
    "transition-colors",
    "disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "placeholder-gray-500 placeholder:text-subtitle-18-medium",
  ),
);

export interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  onClear?: () => void;
}

const Input = ({ className, onClear, ...props }: InputProps) => {
  return (
    <div className="relative">
      <input className={cn(inputVariants(), className)} {...props} />
      {!!onClear && (
        <button
          type="button"
          className="-translate-y-1/2 absolute top-1/2 right-16px h-24px w-24px"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
};

const ClearIcon = () => {
  return (
    <Image
      src="/static/images/clear-icon.svg"
      alt="clear"
      width={24}
      height={24}
    />
  );
};

export { Input };
