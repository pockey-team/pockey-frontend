import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthWithdarwForm } from "@/components/auth/withdraw";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { authOptions } from "@/lib/auth";

const AuthSettingsWithdrawPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    const params = new URLSearchParams({ callbackUrl: "/auth/settings" });
    return redirect(`/auth/sign-in?${params}`);
  }

  return (
    <Page className="bg-gray-800">
      <Page.Header>
        <Page.Header.Left>
          <Back />
        </Page.Header.Left>
        <Page.Header.Center className="text-body-16-regular text-gray-100">
          회원탈퇴
        </Page.Header.Center>
      </Page.Header>

      <Page.Container className="flex flex-col py-32px">
        <h1 className="mb-8px text-gray-100 text-heading-24-semibold">
          {session.user.name}님,
          <br />
          떠나시려는 이유를 알려주세요
        </h1>
        <p className="text-gray-500 text-subtitle-16-semibold">
          더 좋은 서비스를 제공하기 위해 노력하겠습니다.
        </p>
      </Page.Container>

      <AuthWithdarwForm />
    </Page>
  );
};

export default AuthSettingsWithdrawPage;
