"use client";

import html2canvas from "html2canvas";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/shared/button";
import { CaptureRecommendationDetail } from "./capture-recommendation-detail";

const SAMPLE_USER_NAME = "포키";

export const SaveImageButton = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (isCapturing && captureRef.current) {
      const element = captureRef.current;
      setTimeout(() => {
        html2canvas(element, {
          width: 390,
          scale: window.devicePixelRatio,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
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
      }, 300);
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
        className={`h-full w-[390px] overflow-hidden ${isCapturing ? "-left-[9999px] absolute block" : "hidden"} `}
      >
        <CaptureRecommendationDetail ref={captureRef} />
      </div>
    </ul>
  );
};
