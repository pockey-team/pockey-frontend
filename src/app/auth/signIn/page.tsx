import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { SignInButton } from "@/components/auth/sign-in-button";
import { authOptions } from "@/lib/auth";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="font-bold text-3xl tracking-tight">Pockey</h1>
      </div>
      <SignInButton />
    </div>
  );
};

export default SignInPage;
