"use server";
import { signIn, signOut } from "../../../../../auth";

type AuthError = {
  type: string;
  message?: string;
};

export const loginWithGoogle = async () => {
  try {
    await signIn("google");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

export const loginWithGithub = async () => {
  try {
    await signIn("github");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

export const loginWithCredentials = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
    return { success: true };
  } catch (error) {
    if (typeof error === "object" && error !== null && "type" in error) {
      const authError = error as AuthError;
      if (authError.type === "CredentialsSignin") {
        return { success: false, error: "Dados de login incorretos!" };
      }
    }
  }
};

export const logout = async () => {
  try {
    await signOut({ redirect: false }); // Desativa o redirecionamento automático
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Ocorreu um erro ao tentar fazer logout." };
  }
};
