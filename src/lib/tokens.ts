import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "../../data/user";
import { db } from "@/lib/db";

export const generatedVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expired = new Date(new Date().getTime() + 4000 * 1000);

  const existToken = await getVerificationTokenByEmail(email);

  if (existToken) {
    await db.vericationToken.delete({
      where: { id: existToken.id },
    });
  }

  const vericationToken = await db.vericationToken.create({
    data: { token, email, expired },
  });

  return vericationToken;
};
