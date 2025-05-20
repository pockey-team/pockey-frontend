"use client";

import Image, { type ImageProps } from "next/image";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { BottomBarTabs } from "@/components/layout/bottom-bar/bottom-bar-tabs";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const BottomBar = ({ className }: Props) => {
  const router = useRouter();

  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <StarIcon width={25} height={25} />
      <BottomBarTabs />
      <IconButton onClick={() => router.push("/auth/settings")}>
        <UserIcon width={35} height={35} />
      </IconButton>
    </div>
  );
};

const IconButton = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center p-8px"
    >
      {children}
    </button>
  );
};

const StarIcon = ({ ...props }: Omit<ImageProps, "alt" | "src">) => {
  return <Image src="/footer-navigation/star.svg" alt="star-icon" {...props} />;
};

const UserIcon = ({ ...props }: Omit<ImageProps, "alt" | "src">) => {
  return <Image src="/footer-navigation/user.svg" alt="user-icon" {...props} />;
};
