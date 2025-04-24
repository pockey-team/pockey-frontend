"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Button onClick={handleSignOut}>
      <LogOut className="size-4" />
      로그아웃
    </Button>
  );
};
