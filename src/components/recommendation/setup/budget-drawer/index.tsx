import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  onSubmit: (amounts: number[]) => Promise<void> | void;
  onClose?: () => Promise<void> | void;
}

const DEFAULT_AMOUNTS = [10_000, 100_000];

const formatPrice = (amount: number) => {
  return `${amount.toLocaleString()}원`;
};

export const BudgetDrawer = ({ name, onSubmit, onClose }: Props) => {
  const [open, setOpen] = useState(true);
  const [amounts, setAmounts] = useState(DEFAULT_AMOUNTS);

  const handleSubmit = () => {
    onSubmit(amounts);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open && onClose) {
      setTimeout(() => onClose(), 300);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="mx-auto w-full max-w-md rounded-t-3xl border-none bg-gray-900 px-4 pt-8 pb-10">
        <DrawerHeader className="px-2 py-0 text-left">
          <DrawerTitle className="mb-2 font-medium text-xl">
            <span className="text-green-300">{name} 님</span>
            <span className="text-gray-500">에게</span>
          </DrawerTitle>

          <div className="mb-2 flex items-baseline">
            <span className="font-semibold text-3xl text-gray-100 underline">
              {formatPrice(amounts[1])}
            </span>
            <span className="ml-2 text-gray-500 text-sm"> 예산 계획</span>
          </div>

          <Slider
            defaultValue={amounts}
            min={10_000}
            max={500_000}
            step={10_000}
            minStepsBetweenThumbs={1}
            onValueChange={(value) => {
              setAmounts(value);
            }}
            className={cn(
              "my-8",
              "[&>span:nth-child(1)>span]:bg-green-300 [&>span:nth-child(1)]:bg-gray-700",
              "[&>span:nth-child(n+2)>span]:h-6 [&>span:nth-child(n+2)>span]:w-6 [&>span:nth-child(n+2)>span]:border-none [&>span:nth-child(n+2)]:h-6 [&>span:nth-child(n+2)]:w-6",
            )}
          />

          <div className="mb-12 flex justify-between text-base text-gray-500">
            <span>1만원</span>
            <span>20만원</span>
            <span>50만원</span>
          </div>
        </DrawerHeader>

        <DrawerFooter className="px-0 py-0">
          <Button
            type="button"
            className="w-full rounded-lg bg-green-300 py-6 font-semibold text-black text-lg hover:bg-green-200 hover:text-black disabled:bg-gray-500"
            onClick={handleSubmit}
          >
            만들기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
