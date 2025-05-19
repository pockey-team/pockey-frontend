import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("enabled:cursor-pointer transition-colors", {
  variants: {
    size: {
      medium: "rounded-[8px] px-48px py-16px text-subtitle-18-medium",
      large: "rounded-[12px] px-48px py-[17px] text-body-16-bold",
      "x-large": "rounded-[12px] px-48px py-16px text-subtitle-18-bold",
      keyboard: "px-48px py-16px text-subtitle-18-bold",
    },
    variant: {
      contained: [
        "bg-gray-700 text-gray-300 enabled:[&:not([aria-selected='true'])]:hover:bg-gray-600",
        "disabled:text-gray-500",
        "aria-selected:bg-primary-500 aria-selected:text-gray-700",
      ],
      ghost: "bg-transparent hover:bg-white/10",
      icon: "flex items-center justify-center h-10 w-10 rounded-full bg-white/20 text-black hover:bg-white/30",
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "contained",
  },
});

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  size,
  variant,
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn(buttonVariants({ size, variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
