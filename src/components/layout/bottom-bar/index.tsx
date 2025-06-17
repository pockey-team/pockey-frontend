"use client";

import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { BottomBarTabs } from "@/components/layout/bottom-bar/bottom-bar-tabs";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const BottomBar = ({ className }: Props) => {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <StarIcon width={25} height={25} />
      <BottomBarTabs />
      <Link href="/auth/settings">
        <UserIcon width={35} height={35} />
      </Link>
    </div>
  );
};

const StarIcon = ({ ...props }: Omit<ImageProps, "alt" | "src">) => {
  return <Image src="/footer-navigation/star.svg" alt="star-icon" {...props} />;
};

const UserIcon = ({ ...props }: Omit<ImageProps, "alt" | "src">) => {
  return <Image src="/footer-navigation/user.svg" alt="user-icon" {...props} />;
};
