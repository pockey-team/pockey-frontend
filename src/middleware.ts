import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware";

const protectedRoutes = ["/recommendation/result/"];

const _isProtectedRoute = (path: string) => {
  return protectedRoutes.some(
    (route) => path.startsWith(route) && route !== path,
  );
};

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
      authorized: () => {
        // if (isProtectedRoute(req.nextUrl.pathname)) {
        //   return !!token;
        // }
        return true;
      },
    },
    pages: {
      signIn: "/auth/sign-in",
    },
  },
);
