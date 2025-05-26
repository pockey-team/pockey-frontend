"use client";

import { signOut } from "next-auth/react";
import { type PropsWithChildren, useState } from "react";
import { Button } from "@/components/shared/button";
import { Page } from "@/components/shared/page";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  onSignOut?: () => Promise<void>;
}

export const SignOutButton = ({
  onSignOut,
  children,
}: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = onSignOut || (() => signOut({ callbackUrl: "/" }));

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="flex flex-col items-center rounded-t-[24px] border-none bg-gray-700 px-16px py-[56px]"
        >
          <SheetHeader>
            <SheetTitle className="pb-24px text-gray-100 text-heading-20-semibold">
              로그아웃 하시겠어요?
            </SheetTitle>
          </SheetHeader>

          <Page.Container noPadding className="grid grid-cols-2 gap-8px">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-gray-900 hover:bg-gray-800"
            >
              취소
            </Button>
            <Button onClick={handleSignOut} aria-selected={true}>
              로그아웃
            </Button>
          </Page.Container>
        </SheetContent>
      </Sheet>
    </>
  );
};
