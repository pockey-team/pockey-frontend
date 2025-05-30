import { motion } from "framer-motion";
import { SatisfiedButton } from "@/components/recommendation/satisfied-button";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  nextPickCount: number;
  onNextResult: () => void;
  itemId: number;
  receiverName: string;
}

export const ActionButtons = ({
  nextPickCount,
  onNextResult,
  itemId,
  receiverName,
}: ActionButtonsProps) => {
  return (
    <Page.ActionButton
      className="py-[1rem]"
      as={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeIn",
        delay: 0.9,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      {() => (
        <div className="flex w-full justify-between gap-8px">
          <SatisfiedButton itemId={itemId} receiverName={receiverName} />
          <Button
            disabled={nextPickCount === 0}
            onClick={onNextResult}
            variant="ghost"
            className={cn(
              "w-1/2 rounded-xl bg-gray-700 py-16px text-gray-500 text-subtitle-18-bold text-xl tracking-tight hover:bg-gray-700/80 hover:text-gray-500 focus:bg-gray-700 focus:text-gray-500 active:bg-gray-700 active:text-gray-500",
              "scale-100 active:scale-95 active:transition-all active:duration-300 active:ease-in-out",
            )}
          >
            별로예요
          </Button>
        </div>
      )}
    </Page.ActionButton>
  );
};
