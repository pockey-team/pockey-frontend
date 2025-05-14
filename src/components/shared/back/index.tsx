"use client";

import Image, { ImageProps } from "next/image";
import { useRouter } from "next/navigation";

export const Back = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button onClick={handleClick} type="button">
      <ArrowLeftIcon width={24} height={24} />
    </button>
  );
};

const ArrowLeftIcon = ({ ...props }: Omit<ImageProps, "alt" | "src">) => {
  return (
    <Image
      src="/static/images/arrow-left-icon.svg"
      alt="arrow-left-icon"
      {...props}
    />
  );
};
