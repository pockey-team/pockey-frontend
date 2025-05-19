"use client";

import html2canvas from "html2canvas";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { CaptureRecommendationDetail } from "./capture-recommendation-detail";

const SAMPLE_USER_NAME = "포키";

interface Props {
  detailId: string;
}

export const SaveImageButton = ({ detailId }: Props) => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (isCapturing && captureRef.current) {
      const element = captureRef.current;
      setTimeout(() => {
        if (!captureRef.current) {
          setIsCapturing(false);
          return;
        }
        html2canvas(element, {
          width: 390,
          height: element.scrollHeight,
          windowHeight: element.scrollHeight,
          scale: typeof window !== "undefined" ? window.devicePixelRatio : 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: true,
          imageTimeout: 30000,
        })
          .then((canvas) => {
            onSaveAs(
              canvas.toDataURL("image/png"),
              `${SAMPLE_USER_NAME}님을 위한 선물.png`,
            );
            setIsCapturing(false);
          })
          .catch((err) => {
            console.error("캡처 오류:", err);
            setIsCapturing(false);
          });
      }, 1500);
    }
  }, [isCapturing]);

  const handleSaveImage = () => {
    setIsCapturing(true);
  };

  const onSaveAs = (url: string, fileName: string) => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    link.download = fileName;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ul>
      <li className="my-12px flex items-center gap-12px">
        <Button
          variant="ghost"
          disabled={isCapturing}
          onClick={handleSaveImage}
          className="!px-0px !py-0px flex items-center gap-8px focus:bg-transparent"
        >
          <Image
            src="/share/download.svg"
            alt="URL 복사"
            width={24}
            height={24}
          />
          <span>이미지 저장</span>
        </Button>
      </li>

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
          detailId={detailId}
          isCapturing={isCapturing}
        />
      </div>
    </ul>
  );
};
