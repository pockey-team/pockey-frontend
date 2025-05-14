import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
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
