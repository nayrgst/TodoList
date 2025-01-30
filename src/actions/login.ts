"use server";
import * as z from "zod";
import { AuthError } from "next-auth";

import { loginSchema } from "@/schemas/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validateFilds = loginSchema.safeParse(values);

  if (!validateFilds.success) {
    return { error: "E-mail ou Senha incorretos." };
  }

  const { email, password } = validateFilds.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: "Este e-mail não existe!" };
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

  return { success: "Entrando..." };
};

export const loginWithProvider = async (
  provider: "google" | "github" | "linkedin",
) => {
  await signIn(provider, {
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
