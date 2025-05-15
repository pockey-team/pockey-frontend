import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { authControllerLoginWithSocial } from "@/api/__generated__";
import { SocialLoginCommand } from "@/api/__generated__/index.schemas";

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
          const loginCommand: SocialLoginCommand = {
            snsId: token.sub,
            nickname: token.name ?? "",
            profileImageUrl: token.picture ?? "",
          };

          const response = await authControllerLoginWithSocial(loginCommand);

          if (response.data?.accessToken) {
            token.accessToken = response.data.accessToken;
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
    signIn: "/auth/signIn",
    error: "/auth/error",
  },
};
