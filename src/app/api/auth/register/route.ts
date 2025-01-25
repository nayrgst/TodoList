"use server";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/schemas/user";
import { hash } from "bcrypt-ts";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { name, email, password } = await req.json();

    // Valida os dados do usuario.
    const validation = userSchema.safeParse({ name, email, password });
    if (!validation.success) {
      return NextResponse.json(
        { message: "Dados inválidos", errors: validation.error.errors },
        { status: 400 },
      );
    }

    // Verfica se o usuario existe no db.
    const existUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existUser) {
      return NextResponse.json(
        { message: "Esse usuário já existe!" },
        { status: 400 },
      );
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 10);

    // Cria o novo usuario no db.
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("erro durante o registro do usuario", error);
    return NextResponse.json(
      { message: "Erro interno no servidor. Tente novamente mais tarde" },
      { status: 500 },
    );
  }
}
