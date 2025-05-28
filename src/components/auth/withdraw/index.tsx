"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { cloneElement, type JSX, useState } from "react";
import { useAuthControllerWithdraw } from "@/api/__generated__";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import { cn } from "@/lib/utils";

const WITHDRAW_REASONS = [
  "추천 선물이 마음에 들지 않았어요",
  "선물 추천 과정이 복잡하거나 길었어요",
  "서비스를 사용할 때 자주 끊겼어요",
  "다른 선물 서비스가 더 편해요",
  "직접입력",
] as const;

export const AuthWithdarwButton = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  return cloneElement(children, {
    onClick: () => router.push("/auth/settings/withdraw"),
  });
};

export const AuthWithdarwForm = () => {
  const mutation = useAuthControllerWithdraw();

  const [selectedReason, setSelectedReason] = useState<string>("");
  const [detailReason, setDetailReason] = useState<string>("");

  const isDirectInput = selectedReason === "직접입력";
  const reason = isDirectInput ? detailReason.trim() : selectedReason;
  const isValid = !!reason;

  const onWithdraw = async () => {
    await mutation.mutateAsync({ data: { reason } });
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Page.Container>
        <div className="space-y-16px">
          {WITHDRAW_REASONS.map((reason) => (
            <label
              key={reason}
              className="flex cursor-pointer items-center gap-12px"
            >
              <div className="relative">
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "size-20px rounded-full border-2 border-gray-500",
                    selectedReason === reason ? "bg-gray-100" : "bg-gray-500",
                  )}
                />
              </div>
              <span className="text-body-16-regular text-gray-100">
                {reason}
              </span>
            </label>
          ))}
        </div>

        {isDirectInput && (
          <div className="mt-24px">
            <textarea
              value={detailReason}
              onChange={(e) => setDetailReason(e.target.value)}
              placeholder="떠나시는 이유를 자세히 작성해주세요"
              className={cn(
                "h-[160px] w-full rounded-[10px] border border-gray-600 bg-transparent p-16px text-body-16-regular text-gray-100 placeholder:text-gray-500",
                "focus:border-gray-400 focus:outline-none",
              )}
              maxLength={500}
            />
          </div>
        )}
      </Page.Container>

      <Page.ActionButton>
        {(props) => (
          <Button
            {...props}
            size="x-large"
            disabled={!isValid}
            aria-selected={!!isValid}
            onClick={onWithdraw}
          >
            탈퇴하기
          </Button>
        )}
      </Page.ActionButton>
    </>
  );
};
