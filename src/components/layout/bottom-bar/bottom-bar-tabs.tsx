"use client";

import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BottomBarTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(
    pathname === "/find" || pathname === "/",
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setActive(pathname === "/find" || pathname === "/");
  }, [pathname]);

  const handleToggle = (newActive: boolean, path: string) => {
    if (!isAnimating && active !== newActive) {
      setIsAnimating(true);
      setActive(newActive);

      setTimeout(() => {
        router.push(path);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="relative flex h-[60px] w-[128px] items-center rounded-full bg-white/20 p-8px">
      <motion.div
        className="absolute z-0 h-[80%] rounded-3xl bg-white/40 shadow-md"
        initial={false}
        animate={{
          x: active ? "4%" : "115%",
          width: "40%",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.3,
        }}
      />

      <Button
        variant="ghost"
        className={cn(
          "relative z-10 flex h-full flex-1 items-center justify-center rounded-3xl text-center font-bold tracking-tight hover:bg-transparent",
          active ? "text-blue-500" : "text-gray-500",
        )}
        onClick={() => handleToggle(true, "/find")}
        disabled={isAnimating}
      >
        <HomeIcon width={35} height={35} />
      </Button>

      <Button
        variant="ghost"
        className={cn(
          "relative z-10 flex h-full flex-1 items-center justify-center rounded-full text-center font-bold tracking-tight hover:bg-transparent",
          !active ? "text-blue-500" : "text-gray-500",
        )}
        onClick={() => handleToggle(false, "/wishlist")}
        disabled={isAnimating}
      >
        <ResultIcon width={35} height={35} />
      </Button>
    </div>
  );
};

const HomeIcon = ({ ...props }: Omit<ImageProps, "alt" | "src">) => {
  return <Image src="/footer-navigation/home.svg" alt="home-icon" {...props} />;
};

const ResultIcon = ({ ...props }: Omit<ImageProps, "alt" | "src">) => {
  return (
    <Image src="/footer-navigation/result.svg" alt="result-icon" {...props} />
  );
};
