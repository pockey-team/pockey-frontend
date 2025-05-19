"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SHARE_CONTENTS } from "@/constants/share";
import { cn } from "@/lib/utils";
import { SaveImageButton } from "../save-image-button";

interface Props {
  className?: string;
  detailId: string;
}

export const ShareButton = ({ className = "", detailId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "rounded-lg bg-gray-700 text-gray-300 text-subtitle-18-semibold",
            className,
          )}
        >
          공유하기
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="flex max-h-[254px] flex-col items-center rounded-tl-2xl rounded-tr-2xl border-none bg-gray-700 px-24px"
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
          <SaveImageButton detailId={detailId} />
          {SHARE_CONTENTS.map((content) => (
            <ul key={content.label} className="flex flex-col">
              <li className="my-12px flex items-center gap-12px">
                <Image
                  src={content.imageUrl}
                  alt={content.label}
                  width={24}
                  height={24}
                />
                <span>{content.label}</span>
              </li>
            </ul>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SheetBar = () => {
  return <div className="h-4px w-32px rounded-full bg-gray-600" />;
};
