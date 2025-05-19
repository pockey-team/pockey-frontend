"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const ShareUrlButton = () => {
  const currentUrl = usePathname();

  const resultUrl = `${window.location.origin}${currentUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(resultUrl);
    toast.success("URL이 복사되었습니다.");
  };

  return (
    <Button
      variant="ghost"
      onClick={handleCopy}
      className="flex items-center gap-12px hover:bg-transparent hover:text-gray-100"
    >
      <Image src="/share/copy.svg" alt="URL 복사" width={24} height={24} />
      <span>URL 복사</span>
    </Button>
  );
};
