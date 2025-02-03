"use server";

import * as z from "zod";
import { TodoSchema } from "@/schemas/todo";
import { db } from "@/lib/db";
import { auth } from "@/auth";

const getUserId = async () => {
  const session = await auth();
  return session?.user?.id || null;
};

export const createTodo = async (values: z.infer<typeof TodoSchema>) => {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "Usuário não identificado." };

    const validatedFields = TodoSchema.safeParse(values);
    if (!validatedFields.success)
      return { error: "A tarefa não pode estar vazia." };

    const { description } = validatedFields.data;

    const newTodo = await db.todo.create({
      data: { userId, description },
    });

    return { success: "Tarefa adicionada com sucesso!", todo: newTodo };
  } catch (error) {
    console.error("Erro ao adicionar a tarefa:", error);
    return { error: "Falha ao adicionar a tarefa!" };
  }
};

export const getTodos = async () => {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "Usuário não identificado." };

    const todos = await db.todo.findMany({ where: { userId } });

    return { success: "Tarefas carregadas com sucesso!", todos };
  } catch (error) {
    console.error("Erro ao carregar as tarefas:", error);
    return { error: "Falha ao carregar as tarefas!" };
  }
};

export const updateCheckedTodo = async (id: string, completed: boolean) => {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "Usuário não identificado." };

    const existingTodo = await db.todo.findUnique({ where: { id } });
    if (!existingTodo) return { error: "Tarefa não encontrada!" };
    if (existingTodo.userId !== userId) return { error: "Acesso negado!" };

    const updatedTodo = await db.todo.update({
      where: { id },
      data: { completed },
    });

    return { success: "Tarefa concluída com sucesso!", todo: updatedTodo };
  } catch (error) {
    console.error("Erro ao concluir a tarefa:", error);
    return { error: "Falha ao concluir a tarefa!" };
  }
};

export const updateTextTodo = async (id: string, description: string) => {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "Usuário não identificado." };

    const existingTodo = await db.todo.findUnique({ where: { id } });
    if (!existingTodo) return { error: "Tarefa não encontrada!" };
    if (existingTodo.userId !== userId) return { error: "Acesso negado!" };

    const updatedTodo = await db.todo.update({
      where: { id },
      data: { description },
    });

    return { success: "Tarefa atualizada com sucesso!", todo: updatedTodo };
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error);
    return { error: "Falha ao atualizar a tarefa!" };
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "Usuário não identificado." };

    const existingTodo = await db.todo.findUnique({ where: { id } });
    if (!existingTodo) return { error: "Tarefa não encontrada!" };
    if (existingTodo.userId !== userId) return { error: "Acesso negado!" };

    await db.todo.delete({ where: { id } });

    return { success: "Tarefa excluída com sucesso!" };
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
    return { error: "Falha ao excluir a tarefa!" };
  }
};
