import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware";

const protectedRoutes = ["/recommendation/result/"];

const isProtectedRoute = (path: string) => {
  return protectedRoutes.some(
    (route) => path.startsWith(route) && route !== path,
  );
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
    },
  },
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|mockServiceWorker.js|.*\\.png$|.*\\.svg$|$).*)",
  ],
};
