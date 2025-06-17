"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const itemVariants = {
  initial: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  inView: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
  },
};

export const LandingHeader = () => {
  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      whileInView="inView"
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="fixed top-0 z-50 flex h-[60px] w-full items-center justify-start bg-transparent px-32px"
    >
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={100} height={100} priority />
      </Link>
    </motion.div>
  );
};
