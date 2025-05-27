import Image from "next/image";
import Link from "next/link";
import { Page } from "@/components/shared/page";

const RECEIVER_LIST = [
  {
    id: 1,
    name: "서현",
  },
  {
    id: 2,
    name: "지혜",
  },
  {
    id: 3,
    name: "다혜",
  },
];

const WishlistPage = () => {
  return (
    <Page>
      <Page.Header>
        <Page.Header.Left>
          <Image src="/logo.svg" alt="logo" width={91} height={24} />
        </Page.Header.Left>
      </Page.Header>

      <Page.Container noPadding>
        <Page.Title className="text-start">
          <p>정성스럽게 고른</p>
          <span className="text-primary-500">3개</span>의 보관함이 있어요.
        </Page.Title>

        <div className="flex items-center gap-4px">
          <Link href="/wishlist">전체</Link>
          {RECEIVER_LIST.map((receiver) => (
            <Link
              href={`/wishlist?receiver=${receiver.name}`}
              key={receiver.id}
            >
              {receiver.name}
            </Link>
          ))}
        </div>
      </Page.Container>
    </Page>
  );
};

export default WishlistPage;
