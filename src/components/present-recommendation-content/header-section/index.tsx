import { motion } from "framer-motion";
import { Page } from "@/components/shared/page";

interface HeaderSectionProps {
  isAnimating: boolean;
}

export const HeaderSection = ({ isAnimating }: HeaderSectionProps) => (
  <motion.div
    initial={{ y: "30vh" }}
    animate={{ y: isAnimating ? 0 : "30vh" }}
    transition={{
      duration: 2,
      type: "spring",
      damping: 20,
      stiffness: 100,
    }}
    className="z-10 flex flex-col items-center"
  >
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Page.Title className="mt-48px font-bold text-gray-100 text-heading-24-semibold">
        딱 맞는 선물, 함께 골라볼까요?
      </Page.Title>
    </motion.div>

    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Page.SubTitle className="mt-16px font-medium text-gray-400 text-heading-20-semibold">
        질문을 풀며 원하는 선물을 찾아가요
      </Page.SubTitle>
    </motion.div>
  </motion.div>
);
