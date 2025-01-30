import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Linkedin from "next-auth/providers/linkedin";
import { compare } from "bcrypt-ts";

import { loginSchema } from "@/schemas/user";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Linkedin({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRETE,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFilds = loginSchema.safeParse(credentials);

        if (validateFilds.success) {
          const { email, password } = validateFilds.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const vsfPassword = await compare(password, user.password);

          if (vsfPassword) {
            console.log("AUTORIZADO", user);

            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
