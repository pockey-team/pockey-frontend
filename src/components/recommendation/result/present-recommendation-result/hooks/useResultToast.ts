import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TOAST_STYLE } from "@/constants/recommendation-result";

export const useResultToast = (nextPickCount: number) => {
  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => setShowToast(true);

  useEffect(() => {
    if (showToast) {
      toast.success(
        nextPickCount > 0
          ? `결과를 볼 수 있는 기회가 ${nextPickCount}번 남았어요.`
          : "결과를 볼 수 있는 기회가 없어요.",
        {
          duration: 2000,
          id: "next-pick-toast",
          icon: null,
          style: TOAST_STYLE,
        },
      );
      setShowToast(false);
    }
  }, [showToast, nextPickCount]);

  return {
    triggerToast,
  };
};
