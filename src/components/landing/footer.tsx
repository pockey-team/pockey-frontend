"use client";

import { motion } from "framer-motion";

const itemVariants = {
  initial: { opacity: 0, y: 50 },
  inView: {
    opacity: 1,
    y: 0,
  },
};

export const FooterSection = () => {
  return (
    <div className="relative bg-gray-900">
      <motion.div
        variants={itemVariants}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          duration: 0.8,
          delay: 0.5,
        }}
        initial="initial"
        whileInView="inView"
        viewport={{
          once: true,
          margin: "0px 0px -15% 0px",
        }}
        className="mx-auto flex max-w-[358px] flex-col items-center justify-center px-[55px] text-center sm:px-0px"
      >
        <h1 className="text-heading-22-semibold md:text-heading-24-semibold lg:text-display-32-semibold">
          딱 맞는 선물, 포키에서
        </h1>
        <p className="mt-8px whitespace-nowrap break-keep text-body-14-medium text-gray-400 lg:text-subtitle-18-medium">
          상황, 예산, 취향까지 고려해 당신이 선물하고 싶은
          <br /> '그 사람'에게 딱 맞는 선물을 추천합니다.
        </p>
      </motion.div>
      <div className="h-[80px] bg-gray-900" />
    </div>
  );
};
