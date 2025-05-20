import { type PropsWithChildren, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Props {
  active: boolean;
  onClick: () => void;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const CloverButton = ({
  active,
  onClick,
  position,
  children,
}: PropsWithChildren<Props>) => {
  const color = active ? "#C9DAFF" : "#4B5563";

  const edge = useMemo(() => {
    switch (position) {
      case "top-left":
        return <TopLeft color={color} />;
      case "top-right":
        return <TopRight color={color} />;
      case "bottom-left":
        return <BottomLeft color={color} />;
      case "bottom-right":
        return <BottomRight color={color} />;
    }
  }, [color, position]);

  const spacing = useMemo(() => {
    switch (position) {
      case "top-left":
        return "pl-[30px] pr-[20px] pt-[68px] pb-[50px]";
      case "top-right":
        return "pr-[30px] pl-[20px] pt-[68px] pb-[50px]";
      case "bottom-left":
        return "pl-[30px] pr-[20px] pb-[68px] pt-[50px]";
      case "bottom-right":
        return "pr-[30px] pl-[20px] pb-[68px] pt-[50px]";
    }
  }, [position]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative aspect-square w-full focus:outline-none"
    >
      <div className="absolute z-10 h-full w-full">{edge}</div>
      <div
        className={cn(
          "relative z-20 flex h-full w-full items-center justify-center break-keep text-subtitle-18-semibold transition-colors",
          active ? "text-primary-500" : "text-gray-400",
          spacing,
        )}
      >
        {children}
      </div>
    </button>
  );
};

const TopLeft = ({ color }: { color: string }) => {
  return (
    <svg
      width="169"
      height="166"
      viewBox="0 0 169 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <title>Top Left</title>
      <path
        d="M98.1703 0.224612C124.646 0.224611 148.673 10.4993 166.305 27.1963L166.812 27.6807C167.261 28.1165 167.614 28.4756 168.55 29.3916C168.904 29.7382 168.91 30.3068 168.564 30.6611C168.217 31.0154 167.649 31.0213 167.294 30.6748C166.332 29.7336 165.997 29.3935 165.564 28.9727L165.071 28.5C147.762 12.1099 124.174 2.01953 98.1703 2.01953L96.9271 2.02735C44.3682 2.67854 2.00034 44.5423 2.00034 96.0479L2.00815 97.2881C2.35232 123.306 13.5054 146.777 31.2845 163.606C31.6444 163.947 31.6602 164.515 31.3197 164.875C30.9789 165.235 30.4102 165.251 30.0501 164.91C11.938 147.765 0.56423 123.84 0.213231 97.3125L0.205418 96.0479C0.205416 43.5214 43.4015 0.895536 96.9046 0.232425L98.1703 0.224612Z"
        fill={color}
      />
    </svg>
  );
};

const TopRight = ({ color }: { color: string }) => {
  return (
    <svg
      width="166"
      height="169"
      viewBox="0 0 166 169"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <title>Top Right</title>
      <path
        d="M165.795 98.1883C165.795 124.664 155.52 148.691 138.823 166.323L138.339 166.83C137.903 167.279 137.544 167.632 136.628 168.568C136.281 168.922 135.713 168.928 135.358 168.582C135.004 168.235 134.998 167.667 135.345 167.312C136.286 166.35 136.626 166.016 137.047 165.582L137.52 165.089C153.91 147.78 164 124.192 164 98.1883L163.992 96.9452C163.341 44.3862 121.477 2.0184 69.9717 2.0184L68.7314 2.02621C42.7135 2.37038 19.2429 13.5234 2.41309 31.3026C2.07237 31.6625 1.50456 31.6783 1.14453 31.3377C0.784515 30.9969 0.768585 30.4282 1.10938 30.0682C18.2545 11.956 42.1793 0.582291 68.707 0.231293L69.9717 0.22348C122.498 0.22348 165.124 43.4196 165.787 96.9227L165.795 98.1883Z"
        fill={color}
      />
    </svg>
  );
};

const BottomLeft = ({ color }: { color: string }) => {
  return (
    <svg
      width="166"
      height="169"
      viewBox="0 0 166 169"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <title>Bottom Left</title>
      <path
        d="M0.205084 70.8507C0.205082 44.3753 10.4798 20.3483 27.1768 2.71596L27.6611 2.20913C28.097 1.76 28.4561 1.40749 29.3721 0.470846C29.7187 0.116614 30.2872 0.110635 30.6416 0.457174C30.9958 0.803797 31.0018 1.37234 30.6553 1.72671C29.7141 2.68912 29.374 3.02355 28.9531 3.45717L28.4805 3.95034C12.0904 21.2587 2 44.8473 2.00001 70.8507L2.00782 72.0939C2.65901 124.653 44.5228 167.021 96.0283 167.021L97.2686 167.013C123.287 166.669 146.757 155.516 163.587 137.736C163.928 137.377 164.495 137.361 164.855 137.701C165.215 138.042 165.231 138.611 164.891 138.971C147.746 157.083 123.821 168.457 97.293 168.808L96.0283 168.816C43.5018 168.816 0.87601 125.619 0.212897 72.1164L0.205084 70.8507Z"
        fill={color}
      />
    </svg>
  );
};

const BottomRight = ({ color }: { color: string }) => {
  return (
    <svg
      width="169"
      height="166"
      viewBox="0 0 169 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <title>Bottom Right</title>
      <path
        d="M70.8307 165.814C44.3553 165.814 20.3283 155.54 2.69595 138.843L2.18911 138.358C1.73999 137.923 1.38747 137.563 0.45083 136.647C0.0965985 136.301 0.0906192 135.732 0.437159 135.378C0.783782 135.024 1.35233 135.018 1.70669 135.364C2.6691 136.305 3.00354 136.646 3.43716 137.066L3.93032 137.539C21.2386 153.929 44.8273 164.02 70.8307 164.02L72.0739 164.012C124.633 163.361 167.001 121.497 167.001 69.9912L166.993 68.751C166.649 42.733 155.496 19.2624 137.716 2.43262C137.357 2.09191 137.341 1.5241 137.681 1.16407C138.022 0.804053 138.591 0.788123 138.951 1.12891C157.063 18.274 168.437 42.1988 168.788 68.7266L168.796 69.9912C168.796 122.518 125.599 165.144 72.0963 165.807L70.8307 165.814Z"
        fill={color}
      />
    </svg>
  );
};
