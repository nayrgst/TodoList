"use server";

import { registerSchema } from "@/schemas/user";
import * as z from "zod";
import { hash } from "bcrypt-ts";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/../data/user";
import { generatedVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validateFilds = registerSchema.safeParse(values);

  if (!validateFilds.success) {
    return { error: "Dados inválidos." };
  }

  const { name, email, password } = validateFilds.data;
  const hashedPassword = await hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "E-mail já cadastrado." };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const vericationToken = await generatedVerificationToken(email);

  return { success: "Um código de verificação foi enviado para o seu e-mail." };
};
