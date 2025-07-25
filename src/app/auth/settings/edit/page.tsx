import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { PropsWithChildren } from "react";
import { SignOutButton } from "@/components/auth/sign-out";
import { AuthWithdarwButton } from "@/components/auth/withdraw";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";

const AuthSettingsEditPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    const params = new URLSearchParams({ callbackUrl: "/auth/settings" });
    return redirect(`/auth/sign-in?${params}`);
  }

  const image =
    session.user.image || "/static/images/auth-settings-profile.svg";

  return (
    <Page className="bg-gray-800">
      <Page.Header>
        <Page.Header.Left>
          <Back />
        </Page.Header.Left>
        <Page.Header.Center className="text-body-16-regular text-gray-100">
          프로필 수정
        </Page.Header.Center>
      </Page.Header>

      <Page.Container className="flex justify-center py-32px">
        <div className="size-[92px] overflow-hidden rounded-full bg-gray-600">
          <Image
            src={image}
            alt="profile"
            width={92}
            height={92}
            className="h-full w-full object-cover"
          />
        </div>
      </Page.Container>

      <Page.Container className="pb-24px">
        <section className="flex flex-col gap-12px rounded-[14px] bg-gray-700 p-24px">
          <PersonInfo>
            <PersonInfo.Label>이름</PersonInfo.Label>
            <PersonInfo.Value>{session.user.name}</PersonInfo.Value>
          </PersonInfo>
          <PersonInfo>
            <PersonInfo.Label>이메일</PersonInfo.Label>
            <PersonInfo.Value>{session.user.email}</PersonInfo.Value>
          </PersonInfo>
        </section>
      </Page.Container>

      <div className="h-8px w-full bg-gray-700" />

      <Page.Container className="flex py-12px">
        <SignOutButton>
          <PersonButton>로그아웃</PersonButton>
        </SignOutButton>
        <div className="mx-8px h-[48px] w-[1px] bg-gray-700" />
        <AuthWithdarwButton>
          <PersonButton>회원탈퇴</PersonButton>
        </AuthWithdarwButton>
      </Page.Container>
    </Page>
  );
};

const PersonInfo = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-between">{children}</div>;
};

PersonInfo.Label = ({ children }: PropsWithChildren) => {
  return <p className="text-body-16-regular text-gray-500">{children}</p>;
};

PersonInfo.Value = ({ children }: PropsWithChildren) => {
  return <p className="text-gray-100 text-subtitle-16-semibold">{children}</p>;
};

const PersonButton = ({
  disabled,
  children,
}: PropsWithChildren<{ disabled?: boolean }>) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "w-full rounded-[8px] text-subtitle-16-semibold transition-colors",
        !disabled && "hover:bg-gray-700 hover:text-white",
        disabled ? "text-gray-500" : "text-gray-100",
      )}
    >
      {children}
    </button>
  );
};

export default AuthSettingsEditPage;
