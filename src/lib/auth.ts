import { cookies } from "next/headers";
import type { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { authControllerLoginWithSocial } from "@/api/__generated__";
import type { SocialLoginCommand } from "@/api/__generated__/index.schemas";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account }) {
      if (token.sub) {
        try {
          const cookieStore = await cookies();
          const deviceId = cookieStore.get("nextauth_deviceId")?.value;

          const loginCommand: SocialLoginCommand = {
            snsId: token.sub,
            nickname: token.name ?? "",
            profileImageUrl: token.picture ?? "",
            deviceId,
          };

          const response = await authControllerLoginWithSocial(loginCommand, {
            headers: {
              Accept: "application/json",
            },
          });

          const data = response.data as unknown as { accessToken: string };

          if (data.accessToken) {
            token.accessToken = data.accessToken;
            token.snsId = token.sub;
            token.provider = account?.provider || "kakao";
          }
        } catch (error) {
          console.error(error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },

    async signIn({ account }) {
      return account?.provider === "kakao";
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
};
