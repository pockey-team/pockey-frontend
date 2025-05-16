import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware";

const protectedRoutes = ["/recommendation/result"];

const isProtectedRoute = (path: string) => {
  return protectedRoutes.some((route) => path.startsWith(route));
};

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (isProtectedRoute(req.nextUrl.pathname)) {
          return !!token;
        }

        return true;
      },
    },

    pages: {
      signIn: "/auth/signIn",
      error: "/auth/error",
    },
  },
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|mockServiceWorker.js|.*\\.png$|.*\\.svg$|$).*)",
  ],
};
