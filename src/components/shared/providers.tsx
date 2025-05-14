import { PropsWithChildren } from "react";
import { MSWProvider } from "@/components/shared/msw-provider";
import { TanstackQueryProvider } from "@/components/shared/tanstack-query-provider";
import { AuthSession } from "@/lib/session-provider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthSession>
      <MSWProvider>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </MSWProvider>
    </AuthSession>
  );
};
