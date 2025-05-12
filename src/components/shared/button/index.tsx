import { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"button"> {
  size?: "medium" | "large" | "x-large" | "keyboard";
  variant?: "contained";
}

export const Button = ({
  size = "medium",
  variant = "contained",
  className,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  let styles = "enabled:cursor-pointer transition-colors";

  switch (size) {
    case "medium":
      styles = cn(
        styles,
        "rounded-[8px] px-48px py-16px text-subtitle-18-medium",
      );
      break;
    case "large":
      styles = cn(styles, "rounded-[12px] px-48px py-[17px] text-body-16-bold");
      break;
    case "x-large":
      styles = cn(
        styles,
        "rounded-[12px] px-48px py-16px text-subtitle-18-bold",
      );
      break;
    case "keyboard":
      styles = cn(styles, "px-48px py-16px text-subtitle-18-bold");
      break;
  }

  switch (variant) {
    case "contained":
      styles = cn(
        styles,
        "bg-gray-700 text-gray-300 enabled:[&:not([aria-selected='true'])]:hover:bg-gray-600",
        "disabled:text-gray-500",
        "aria-selected:bg-primary-500 aria-selected:text-gray-700",
      );
      break;
  }

  return (
    <button className={cn(styles, className)} {...props}>
      {children}
    </button>
  );
};
