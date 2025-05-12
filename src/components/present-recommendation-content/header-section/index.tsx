import { motion } from "framer-motion";
import { Page } from "@/components/shared/page";

interface HeaderSectionProps {
  isAnimating: boolean;
  isNextStepButtonClicked: boolean;
}

export const HeaderSection = ({
  isAnimating,
  isNextStepButtonClicked,
}: HeaderSectionProps) => (
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
      initial={{ opacity: 0.8, y: 0 }}
      animate={{
        opacity: isNextStepButtonClicked ? 0 : 1,
        y: isNextStepButtonClicked ? -50 : 0,
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
    >
      <Page.Title className="mt-48px font-bold text-gray-100 text-heading-24-semibold">
        딱 맞는 선물, 함께 골라볼까요?
      </Page.Title>
    </motion.div>

    <motion.div
      initial={{ opacity: 0.6, y: 0 }}
      animate={{
        opacity: isNextStepButtonClicked ? 0 : 1,
        y: isNextStepButtonClicked ? -30 : 0,
      }}
      transition={{
        duration: 0.7,
        delay: isNextStepButtonClicked ? 0.1 : 0.2,
        ease: "easeInOut",
      }}
    >
      <Page.SubTitle className="mt-16px font-medium text-heading-20-semibold text-white">
        질문을 풀며 원하는 선물을 찾아가요
      </Page.SubTitle>
    </motion.div>
  </motion.div>
);
