import { PropsWithChildren } from "react";
import { MSWProvider } from "@/components/shared/msw-provider";
import { TanstackQueryProvider } from "@/components/shared/tanstack-query-provider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <MSWProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </MSWProvider>
  );
};
