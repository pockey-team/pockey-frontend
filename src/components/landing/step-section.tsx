"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  stepNumber: number;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
}

const itemVariants = {
  initial: { opacity: 0, y: 60 },
  inView: {
    opacity: 1,
    y: 0,
  },
};

export const StepSection = ({
  stepNumber,
  title,
  description,
  image,
}: Props) => {
  return (
    <div className="w-full bg-gray-900 px-24px py-[72px] sm:px-32px">
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
        className="mx-auto flex max-w-full flex-col items-center justify-between sm:flex-row md:max-w-2xl lg:max-w-4xl"
      >
        <div className="flex flex-col items-start">
          <p className="text-body-14-medium text-primary-500 lg:text-subtitle-18-semibold">
            STEP {stepNumber}
          </p>
          <h1 className="mt-8px h-[72px] max-w-lg overflow-hidden break-keep text-heading-22-semibold leading-9 tracking-wide md:text-heading-24-semibold lg:text-display-32-semibold">
            {title}
          </h1>
          <p className="mt-16px whitespace-nowrap text-body-14-regular text-gray-400">
            {description}
          </p>
        </div>

        <div className="mt-24px sm:mt-0px">
          <Image src={image} alt="step-image" width={470} height={240} />
        </div>
      </motion.div>
    </div>
  );
};
