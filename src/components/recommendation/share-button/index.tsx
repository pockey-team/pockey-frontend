"use client";

import { useState } from "react";
import type { RecommendSessionControllerSubmitAnswer201OneOfOneoneItem } from "@/api/__generated__/index.schemas";
import { SaveImageButton } from "@/components/recommendation/save-image-button";
import { ShareUrlButton } from "@/components/recommendation/share-url-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Props {
  item: RecommendSessionControllerSubmitAnswer201OneOfOneoneItem;
  className?: string;
  receiverName?: string;
}

export const ShareButton = ({ className = "", item, receiverName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSheet = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "rounded-lg bg-gray-700 text-gray-300 text-subtitle-18-semibold hover:bg-gray-700/80 hover:text-gray-300",
            className,
          )}
        >
          공유하기
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="desktop: mx-auto flex max-h-[254px] desktop:max-w-md mobile:max-w-full flex-col items-center rounded-tl-2xl rounded-tr-2xl border-none bg-gray-700 px-24px"
      >
        <SheetBar />
        <SheetHeader>
          <SheetTitle className="text-gray-200 text-subtitle-18-semibold">
            공유하기
          </SheetTitle>
          <SheetDescription className="sr-only">
            오늘의 선물을 공유해 보세요.
          </SheetDescription>
        </SheetHeader>

        <div className="size-full flex-1 text-body-16-regular text-gray-100">
          <SaveImageButton item={item} onCloseSheet={handleCloseSheet} />
          <ShareUrlButton
            detailId={item.product.id.toString()}
            onCloseSheet={handleCloseSheet}
            receiverName={receiverName}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SheetBar = () => {
  return <div className="h-4px w-32px rounded-full bg-gray-600" />;
};
