import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== "credentials") return true;

      return true;
    },
  },

  adapter: PrismaAdapter(db),

  session: { strategy: "jwt" },
  ...authConfig,
});
