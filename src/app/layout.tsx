import type { Metadata } from "next";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { AuthSession } from "@/lib/session-provider";
import { TanstackQueryProvider } from "@/lib/tanstack-provider";

import "./globals.css";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pockey | 포키",
  description: "Pockey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn(pretendard.variable, inter.variable, pretendard.className)}>
        <div className="mx-auto h-dvh min-h-screen w-full max-w-full p-4 shadow-2xl sm:max-w-[390px]">
          <TanstackQueryProvider>
            <AuthSession>
              {children}
            </AuthSession>
          </TanstackQueryProvider>
        </div>
      </body>
    </html>
  );
}
