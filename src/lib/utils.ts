import { compareSync } from "bcrypt-ts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./prisma";

type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function findUser(
  email: string,
  password: string,
): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const vrfPasswd = compareSync(password, user.password || "");

  if (vrfPasswd) {
    return { id: user.id, email: user.email, name: user.name };
  }

  return null;
}
