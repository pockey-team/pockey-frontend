"use client";

import { SessionProvider } from "next-auth/react";

type AuthSessionProps = {
  children: React.ReactNode;
};

export const AuthSession = ({ children }: AuthSessionProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
