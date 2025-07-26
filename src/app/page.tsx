import Image from "next/image";
import Link from "next/link";
import { BottomBar } from "@/components/layout/bottom-bar";
import { PresentRecommendationContent } from "@/components/present-recommendation-content";
import { Page } from "@/components/shared/page";

export default async function Home() {
  return (
    <Page className="bg-gradient-secondary">
      <Page.Header>
        <Page.Header.Left>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </Link>
        </Page.Header.Left>
      </Page.Header>

      <Page.Container
        className="flex h-full flex-1 flex-col items-center justify-center"
        noPadding
      >
        <PresentRecommendationContent />
      </Page.Container>
      <Page.ActionButton>
        {(props) => <BottomBar {...props} className="relative z-50" />}
      </Page.ActionButton>
    </Page>
  );
}
