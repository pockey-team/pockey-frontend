"use client";

import html2canvas from "html2canvas";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type {
  RecommendSessionControllerSubmitAnswer201OneOfOneoneItem,
  RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct,
} from "@/api/__generated__/index.schemas";
import { Button } from "@/components/ui/button";
import { TOAST_STYLE } from "@/constants/recommendation-result";
import { cn } from "@/lib/utils";
import { CaptureRecommendationDetail } from "./capture-recommendation-detail";

interface Props {
  item:
    | RecommendSessionControllerSubmitAnswer201OneOfOneoneItem
    | RecommendSessionControllerSubmitAnswer201OneOfOneoneItemProduct;
  onCloseSheet?: () => void;
}

export const SaveImageButton = ({ item, onCloseSheet }: Props) => {
  const searchParams = useSearchParams();
  const receiverName = searchParams.get("name");

  const captureRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSaveAs = useCallback((url: string, fileName: string) => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    link.download = fileName;
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    if (isCapturing && captureRef.current) {
      const element = captureRef.current;
      setTimeout(() => {
        if (!captureRef.current) {
          setIsCapturing(false);
          return;
        }
        setIsLoading(true);
        html2canvas(element, {
          width: 390,
          height: element.scrollHeight,
          windowHeight: element.scrollHeight,
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: true,
          imageTimeout: 30000,
        })
          .then((canvas) => {
            onSaveAs(
              canvas.toDataURL("image/png"),
              `${receiverName}님을 위한 선물.png`,
            );
            setIsCapturing(false);
            setIsLoading(false);
            onCloseSheet?.();
            toast.success("이미지가 저장되었어요.", {
              duration: 2000,
              id: "save-image-toast",
              icon: null,
              style: TOAST_STYLE,
            });
          })
          .catch((err) => {
            console.error("캡처 오류:", err);
            setIsCapturing(false);
          });
      }, 1500);
    }
  }, [isCapturing, onCloseSheet, receiverName, onSaveAs]);

  const handleSaveImage = () => {
    setIsLoading(true);
    setIsCapturing(true);
  };

  return (
    <ul>
      <Button
        onClick={handleSaveImage}
        variant="ghost"
        className="!bg-transparent !text-gray-100 flex items-center gap-8px px-8px py-4px"
        disabled={isLoading}
      >
        <Image
          src="/share/download.svg"
          alt="이미지 저장"
          width={24}
          height={24}
        />
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <span>이미지 저장</span>
        )}
      </Button>

      <div
        className={cn(
          "w-[390px]",
          isCapturing
            ? "-left-[9999px] absolute top-0 block h-auto overflow-visible"
            : "hidden",
        )}
      >
        <CaptureRecommendationDetail
          ref={captureRef}
          item={item}
          isCapturing={isCapturing}
          receiverName={receiverName ?? ""}
        />
      </div>
    </ul>
  );
};
