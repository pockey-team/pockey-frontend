import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/sign-out-button";

const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex h-full flex-col items-center gap-4">
      <div className="flex flex-1 items-center">
        <h1 className="text-4xl font-bold tracking-tight">Pockey Frontend</h1>
      </div>

      {/* 추후 제거 예정입니다. */}
      {!session && (
        <Button asChild>
          <Link href="/auth/signIn">로그인 페이지로 이동</Link>
        </Button>
      )}

      {/* 추후 제거 예정입니다. */}
      {session && (
        <SignOutButton />
      )}
    </main>
  );
};

export default Home;
