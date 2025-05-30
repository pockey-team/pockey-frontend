"use client";

import Image, { type ImageProps } from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  label?: string;
  path?: string;
}

export const Back = ({ label, path }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (path) {
      router.push(path);
      return;
    }

    router.back();
  };

  return (
    <button onClick={handleClick} type="button">
      {label ? label : <ArrowLeftIcon width={24} height={24} />}
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
