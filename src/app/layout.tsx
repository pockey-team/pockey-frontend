import type { Metadata } from "next";
import "@/app/globals.css";
import localFont from "next/font/local";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { Providers } from "@/components/shared/providers";
import { cn } from "@/lib/utils";

if (
  process.env.NEXT_RUNTIME === "nodejs" &&
  process.env.NODE_ENV !== "production"
) {
  const { server } = await import("@/mocks/node");
  server.listen();
}

const Pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  fallback: ["Pretendard"],
  adjustFontFallback: false,
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Pockey | 포키",
  description: "Pockey",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn(Pretendard.variable)}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
