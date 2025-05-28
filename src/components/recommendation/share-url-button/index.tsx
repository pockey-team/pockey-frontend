"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TOAST_STYLE } from "@/constants/recommendation-result";

interface Props {
  detailId: string;
  onCloseSheet?: () => void;
  receiverName?: string;
}

export const ShareUrlButton = ({
  detailId,
  onCloseSheet,
  receiverName,
}: Props) => {
  const sessionId = window.sessionStorage.getItem("pockey.sessionId");

  const resultUrl = `${window.location.origin}/recommendation/share/${detailId}?sessionId=${sessionId}&receiverName=${receiverName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(resultUrl);
    toast.success("URL이 복사되었어요.", {
      duration: 2000,
      id: "url-copy-toast",
      icon: null,
      style: TOAST_STYLE,
    });
    onCloseSheet?.();
  };

  return (
    <Button
      variant="ghost"
      onClick={handleCopy}
      className="!bg-transparent !text-gray-100 flex items-center gap-8px px-8px py-4px"
    >
      <Image src="/share/copy.svg" alt="URL 복사" width={24} height={24} />
      <span>URL 복사</span>
    </Button>
  );
};
