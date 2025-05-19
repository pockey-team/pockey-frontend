import type { Metadata } from "next";
import "@/app/globals.css";
import localFont from "next/font/local";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { Providers } from "@/components/shared/providers";
import { cn } from "@/lib/utils";

// if (
//   process.env.NEXT_RUNTIME === "nodejs" &&
//   process.env.NODE_ENV !== "production"
// ) {
//   const { server } = await import("@/mocks/node");
//   server.listen();
// }

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
  description:
    "고민은 줄이고, 마음은 더하게. 수신자 맞춤형 선물 추천 서비스, Pockey",
  applicationName: "Pockey | 포키",
  alternates: { canonical: "https://pockey.pics" },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon-512.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://pockey.pics",
    title: "Pockey | 포키",
    description:
      "고민은 줄이고, 마음은 더하게. 수신자 맞춤형 선물 추천 서비스, Pockey",
    siteName: "Pockey | 포키",
  },
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
