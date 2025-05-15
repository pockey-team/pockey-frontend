import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { SignInButton } from "@/components/auth/sign-in";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <Page className="bg-signInBackground">
      <Page.Header>
        <Page.Header.Left></Page.Header.Left>
        <Page.Header.Right>
          <Button variant="ghost">닫기</Button>
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
