import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware";

const PROTECTED_ROUTES = ["/recommendation/result/"];

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|mockServiceWorker.js|.*\\.png$|.*\\.svg$|$).*)",
  ],
};

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
          pathname.startsWith(route),
        );

        if (isProtectedRoute) {
          return !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: "/auth/sign-in",
    },
  },
);
