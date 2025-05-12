"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const PresentBoxSection = () => {
  return (
    <motion.div className="relative z-20 flex h-[399px] w-[274px] flex-col items-center gap-8 rounded-3xl bg-white p-8 px-24px py-[22px] text-center">
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          delay: 1,
          duration: 1.5,
        }}
        whileHover={{ scale: 1.05 }}
        className="relative size-[260px]"
      >
        <Image
          src="/present.svg"
          alt="선물 이미지"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mb-8px font-bold text-black"
      >
        오늘의 선물 꾸러미
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full"
      >
        <Button className="min-h-48px w-full rounded-[21px] bg-black p-16px font-bold text-foreground text-xl tracking-tight">
          지금 선물하기
        </Button>
      </motion.div>
    </motion.div>
  );
};
