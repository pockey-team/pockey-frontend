export declare module "next-auth" {
  interface User {
    accessToken?: string;
    backendToken?: string;
    backendRefreshToken?: string;
    snsId?: string;
    provider?: string;
  }

  interface Session {
    accessToken?: string;
    backendToken?: string;
    backendRefreshToken?: string;
    userId?: string;
    provider?: string;
  }
}

export declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    backendToken?: string;
    backendRefreshToken?: string;
    snsId?: string;
    provider?: string;
  }
}
