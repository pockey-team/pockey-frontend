import Image from "next/image";
import { getServerSession } from "next-auth";
import { SignInButton } from "@/components/auth/sign-in-button";
import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  console.log("===session===", session);

  // if (session) {
  //   redirect("/");
  // }

  return (
    // <div className="flex h-full flex-col items-center bg-gray-500">
    //   <div className="flex flex-1 flex-col items-center justify-center">
    //     <Image src="/logo.svg" alt="logo" width={100} height={100} />
    //   </div>
    //   <SignInButton />
    // </div>
    <Page className="">
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
