import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SignInButton } from "@/components/auth/sign-in-button";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const ErrorPage = () => {
  return (
    <div className="flex h-dvh items-center justify-center px-2">
      <section className="flex flex-col gap-8 break-keep">
        <h1 className="text-center">
          <span className="font-bold text-2xl sm:text-3xl">
            로그인 한 유저만 접근할 수 있습니다.
          </span>
        </h1>
        <p className="text-center font-normal text-muted-foreground text-xs/5 sm:text-sm/6">
          이 페이지에 접근하기 위해서는 로그인이 필요합니다.
          <br />
          하단의 버튼을 눌러 로그인을 진행하시거나 메인페이지로 이동해주세요.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Suspense fallback={<Spinner />}>
            <SignInButton />
          </Suspense>
          <Button variant="outline" className="group" asChild>
            <Link href="/">
              <Undo2 className="mr-2 size-4 group-hover:text-primary" />
              메인페이지로 돌아가기
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
