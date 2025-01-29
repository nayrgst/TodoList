"use server";
import * as z from "zod";
import { loginSchema } from "@/schemas/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "../data/user";
import { generatedVerificationToken } from "@/lib/tokens";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validateFilds = loginSchema.safeParse(values);

  if (!validateFilds.success) {
    return { error: "E-mail ou Senha incorretos." };
  }

  const { email, password } = validateFilds.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: "Este E-mail não existe!" };
  }

  if (!user.emailVerified) {
    await generatedVerificationToken(user.email);

    return {
      success: "Link de confirmaçao enviado para o seu e-mail.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "E-mail ou Senha incorretos." };
        default: {
          return { error: "Ops! Algo deu errado!" };
        }
      }
    }
    throw error;
  }
};

export const loginWithProvider = async (
  provider: "google" | "github" | "linkedin",
) => {
  await signIn(provider, {
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
