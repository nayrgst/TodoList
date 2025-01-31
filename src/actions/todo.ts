"use server";

import * as z from "zod";

import { AddTodoSchema } from "@/schemas/todo";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const todo = async (values: z.infer<typeof AddTodoSchema>) => {
  try {
    const validateFilds = AddTodoSchema.safeParse(values);
    const session = await auth();

    if (!validateFilds.success) {
      return { error: "A tarefa não pode estar vazia." };
    }

    const { description } = validateFilds.data;
    const user = await db.user.findUnique({ where: { id: session?.user?.id } });

    if (!user) {
      return { error: "Usuário não existe." };
    }

    const newTodo = await db.todo.create({
      data: {
        userId: user?.id,
        description: description,
      },
    });

    return { success: "Tarefa adicionada com sucesso!", todo: newTodo };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Falha ao criar a tarefa!" };
    }
  }
};

export const getTodos = async () => {
  const session = await auth();

  const user = await db.user.findUnique({ where: { id: session?.user?.id } });

  if (!user) {
    return { error: "Usuário não existe." };
  }

  const todos = await db.todo.findMany({ where: { userId: user?.id } });

  return { success: "Tarefas carregadas com sucesso!", todos: todos };
};
