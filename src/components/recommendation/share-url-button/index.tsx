"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  detailId: string;
  onCloseSheet?: () => void;
}

export const ShareUrlButton = ({ detailId, onCloseSheet }: Props) => {
  const sessionId = window.sessionStorage.getItem("pockey.sessionId");

  const resultUrl = `${window.location.origin}/recommendation/share/${detailId}?sessionId=${sessionId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(resultUrl);
    toast.success("URL이 복사되었습니다.");
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
