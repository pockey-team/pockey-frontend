import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { SignInButton } from "@/components/auth/sign-in-button";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-3xl font-bold tracking-tight">Pockey</h1>
      </div>
      <SignInButton />
    </div>
  );
};

export default SignInPage;
