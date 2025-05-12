"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FooterToggle } from "@/components/layout/footer-toggle";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";

export default function RecommendationSetupNamePage() {
  return (
    <Page className="bg-[linear-gradient(155deg,_#6299ff_44%,_#a6d6ff_93%)]">
      <Page.Header>
        <Page.Header.Left>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </Link>
        </Page.Header.Left>
        <Page.Header.Right>
          <Link href="/">
            <Search className="text-white" />
          </Link>
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="flex flex-1 flex-col items-center justify-center pb-[100px]">
        <div className="mb-[60px] rounded-full bg-white px-[10px] py-[8px] text-[#4282F9] text-body-16-bold">
          필수 정보 4개
        </div>

        <Page.Title className="mb-16px font-bold text-white">
          누구에게 선물하고자 하나요?
        </Page.Title>

        <Page.SubTitle className="text-gray-100">
          선물하고자 하는 상대에 대해 알려주세요
        </Page.SubTitle>
      </Page.Container>

      <Page.ActionButton>
        {(props) => (
          <div className="flex w-full items-center justify-between gap-2">
            <Button variant="ghost" className="text-black hover:bg-transparent">
              <Image
                src="/footer-navigation/star.svg"
                alt="logo"
                width={25}
                height={25}
              />
            </Button>
            <FooterToggle />
            <Button variant="ghost" className="text-black hover:bg-transparent">
              <Image
                src="/footer-navigation/user.svg"
                alt="logo"
                width={35}
                height={35}
              />
            </Button>
          </div>
        )}
      </Page.ActionButton>
    </Page>
  );
}
