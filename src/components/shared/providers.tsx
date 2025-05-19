import { PropsWithChildren } from "react";
import { TanstackQueryProvider } from "@/components/shared/tanstack-query-provider";
import { AuthSession } from "@/lib/session-provider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthSession>
      {/* <MSWProvider> */}
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
      {/* </MSWProvider> */}
    </AuthSession>
  );
};
