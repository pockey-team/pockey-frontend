import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { BottomBar } from "@/components/layout/bottom-bar";
import { Page } from "@/components/shared/page";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "보관함",
    links: [
      {
        image: "/static/images/auth-settings-wishlist.svg",
        name: "저장한 선물 카드",
        url: "/wishlist",
      },
    ],
  },
  {
    title: "공지사항",
    links: [
      {
        image: "/static/images/auth-settings-term.svg",
        name: "서비스 이용약관",
        url: "/auth/settings/term",
      },
      {
        image: "/static/images/auth-settings-privacy.svg",
        name: "개인정보 처리방침",
        url: "/auth/settings/privacy",
      },
      {
        image: "/static/images/auth-settings-feedback.svg",
        name: "의견 보내기",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdVoo3zco0n5ZKb5DXj3SlZVKwTWpNlCDCVLLItTQO5HBsr1g/viewform",
      },
    ],
  },
];

const AuthSettingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    const params = new URLSearchParams({ callbackUrl: "/auth/settings" });
    return redirect(`/auth/sign-in?${params}`);
  }

  const image =
    session.user.image || "/static/images/auth-settings-profile.svg";

  return (
    <Page className="bg-gray-800">
      <Page.Header className="border-none">
        <Page.Header.Left>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </Link>
        </Page.Header.Left>
      </Page.Header>

      <Page.Container className="flex flex-col">
        <section className="mb-24px flex items-center justify-between py-24px">
          <div className="flex items-center gap-12px">
            <Image
              src={image}
              alt="profile"
              width={32}
              height={32}
              className="h-32px w-32px rounded-full"
            />
            <p className="text-gray-100 text-subtitle-18-semibold">
              {session.user.name}
            </p>
          </div>
          <Link href="/auth/settings/edit">
            <button
              type="button"
              className={cn(
                "rounded-[8px] bg-gray-700 px-12px py-[6px] text-gray-300 transition-all",
                "hover:bg-gray-600/50 hover:text-gray-200",
              )}
            >
              프로필 수정
            </button>
          </Link>
        </section>
      </Page.Container>

      {items.map((category) => (
        <Page.Container
          key={category.title}
          as="section"
          className="mb-[36px] px-8px"
          noPadding
        >
          <h2 className="mb-4px px-8px py-8px text-gray-100 text-subtitle-18-semibold">
            {category.title}
          </h2>
          {category.links.map(({ image, name, url }) => (
            <Link
              key={name}
              href={url}
              className={cn(
                "mb-4px flex items-center justify-between rounded-[8px] px-8px py-8px text-gray-100 transition-all",
                "hover:scale-[1.01] hover:bg-gray-700 hover:text-white",
              )}
            >
              <div className="flex items-center gap-8px">
                <Image src={image} alt={name} width={24} height={24} />
                <span className="text-body-16-regular">{name}</span>
              </div>
              <Image
                src="/static/images/arrow-right-icon.svg"
                alt="arrow-right-icon"
                width={20}
                height={20}
              />
            </Link>
          ))}
        </Page.Container>
      ))}

      <Page.ActionButton>
        {(props) => <BottomBar {...props} />}
      </Page.ActionButton>
    </Page>
  );
};

export default AuthSettingsPage;
