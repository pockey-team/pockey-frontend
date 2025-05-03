"use client";

import { PropsWithChildren, Suspense, use } from "react";

const setupMSW =
  process.env.NODE_ENV === "development" && typeof window !== "undefined"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) {
              return;
            }
            print.warning();
          },
        });
      })
    : Promise.resolve();

export const MSWProvider = ({ children }: PropsWithChildren) => {
  if (process.env.NODE_ENV !== "development") {
    return children;
  }

  return (
    <Suspense fallback={null}>
      <MSWProviderInner>{children}</MSWProviderInner>
    </Suspense>
  );
};

const MSWProviderInner = ({ children }: PropsWithChildren) => {
  use(setupMSW);
  return children;
};
