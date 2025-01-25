import { prisma } from "@/lib/prisma";
import { findUser } from "@/lib/utils";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Githib from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Githib,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await findUser(
          credentials?.email as string,
          credentials?.password as string,
        );

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
});
