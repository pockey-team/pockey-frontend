"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FramerMarquee } from "@/components/shared/marquee";
import { MARQUEE_ITEMS } from "@/constants/marquee";

const itemVariants = {
  initial: { opacity: 0, y: 60 },
  inView: {
    opacity: 1,
    y: 0,
  },
};

export const GiftCollectionSection = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-x-hidden overflow-y-hidden bg-gray-900 pt-[15rem]">
      <motion.div
        variants={itemVariants}
        initial="initial"
        whileInView="inView"
        viewport={{
          once: true,
          margin: "0px 0px -50% 0px",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          duration: 0.8,
        }}
        className="relative flex h-[280px] max-w-lg items-center justify-center"
      >
        <FramerMarquee repeat={4} duration={18} gap={0.75}>
          {MARQUEE_ITEMS.map((item) => (
            <Image
              key={item.id}
              src={item.image}
              alt={item.id.toString()}
              width={220}
              height={220}
              className="mx-12px"
              priority
            />
          ))}
        </FramerMarquee>
        <div className="pointer-events-none absolute inset-y-0px left-0px w-1/4 bg-gradient-to-r from-gray-900 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0px right-0px w-1/4 bg-gradient-to-l from-gray-900 to-transparent"></div>

        <div className="absolute inset-0px flex items-center justify-center">
          <h1 className="top-0px text-center text-gray-100 text-subtitle-18-semibold md:text-heading-24-semibold lg:text-display-32-semibold">
            포키와 함께 <br />
            '그 사람'에게 딱 맞는 선물을 찾아보세요
          </h1>
        </div>
      </motion.div>
    </div>
  );
};
