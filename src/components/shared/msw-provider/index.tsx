"use client";

import { type PropsWithChildren, Suspense, use } from "react";

const setupMSW =
  typeof window === "undefined" || process.env.NODE_ENV === "production"
    ? Promise.resolve()
    : import("@/mocks/browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) {
              return;
            }
            print.warning();
          },
        });
      });

export const MSWProvider =
  process.env.NODE_ENV === "production"
    ? ({ children }: PropsWithChildren) => children
    : ({ children }: PropsWithChildren) => {
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
