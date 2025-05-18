import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SignInButton } from "@/components/auth/sign-in";
import { Back } from "@/components/shared/back";
import { Page } from "@/components/shared/page";
import { authOptions } from "@/lib/auth";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <Page className="bg-sign-in">
      <Page.Header>
        <Page.Header.Right>
          <Back label="닫기" />
        </Page.Header.Right>
      </Page.Header>

      <Page.Container className="flex-1">
        <div className="flex h-full flex-1 flex-col items-center justify-center">
          <Image
            src="/sign-in/sign-in-logo.svg"
            alt="logo"
            width={155}
            height={135}
            priority
          />
        </div>
      </Page.Container>

      <Page.ActionButton>
        {(props) => <SignInButton {...props} />}
      </Page.ActionButton>
    </Page>
  );
};

export default SignInPage;
