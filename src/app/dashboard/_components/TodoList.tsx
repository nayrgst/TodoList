"use client";
import { Trash2, FilePenLine } from "lucide-react";

import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { updateCheckedTodo, updateTextTodo, deleteTodo } from "@/actions/todo";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { TodoSchema } from "@/schemas/todo";
import { Input } from "@/components/ui/input";

type Todo = {
  id: string;
  userId?: string;
  description: string | null;
  completed: boolean;
};

interface TodolistProps {
  todos: Todo[];
  updateTodo: (id: string, completed: boolean, description?: string) => void;
  deleteTodoState: (id: string) => void;
}

export const Todolist = ({
  todos,
  updateTodo,
  deleteTodoState,
}: TodolistProps) => {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [editTodoDescription, setEditTodoDescription] = useState("");

  const toggleTodoCompletion = async (id: string, completed: boolean) => {
    const result = await updateCheckedTodo(id, completed);

    if (result?.success) {
      updateTodo(id, completed);
      if (completed) {
        toast("✅ TAREFA MARCADA COMO COMPLETA!");
      } else {
        toast("❌ TAREFA DESMARCADA COMO COMPLETA!");
      }
    } else {
      toast.error("ERRO AO MARCAR/DESMARCAR A TAREFA.");
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditTodoId(todo.id);
    setEditTodoDescription(todo.description || "");
  };

  const handleSaveEditTodo = async (id: string) => {
    const validatedFild = TodoSchema.safeParse({
      description: editTodoDescription,
    });

    if (!validatedFild.success) {
      toast.error("A descrição da tarefa não pode estar vazia.");
      return;
    }

    const result = await updateTextTodo(id, editTodoDescription);

    if (result?.success && result?.todo) {
      updateTodo(id, result.todo.completed, result.todo.description as string);
      toast("✅ TAREFA ATUALIZADA COM SUCESSO!");
      setEditTodoId(null);
    } else {
      toast.error("❌ ERRO AO ATUALIZAR A TAREFA.");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const result = await deleteTodo(id);

    if (result?.success) {
      deleteTodoState(id);
      toast("✅ TAREFA EXCLUÍDA COM SUCESSO!");
    } else {
      toast.error("❌ ERRO AO EXCLUIR A TAREFA.");
    }
  };

  return (
    <PageTransition>
      <section className="p-2 max-w-[1500px] m-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="mb-2 p-3 border rounded-lg bg-black grid grid-cols-[auto_1fr_auto] items-center gap-3"
          >
            <Checkbox
              className="h-4 w-4"
              checked={todo.completed || false}
              onCheckedChange={(checked) => {
                toggleTodoCompletion(todo.id, checked as boolean);
              }}
            />
            {editTodoId === todo.id ? (
              <Input
                type="text"
                className="uppercase p-1 rounded bg-backSecondari w-full"
                autoFocus
                value={editTodoDescription}
                onChange={(event) => setEditTodoDescription(event.target.value)}
                onBlur={() => handleSaveEditTodo(todo.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSaveEditTodo(todo.id);
                  }
                }}
              />
            ) : (
              <p
                className={`uppercase overflow-hidden whitespace-nowrap overflow-ellipsis ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.description}
              </p>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                variant={"ghost"}
                className="rounded-full"
                onClick={() => {
                  handleEditTodo(todo);
                }}
              >
                <FilePenLine className="h-4 w-4 text-yellowBlack" />
              </Button>

              <Button
                size="sm"
                variant={"ghost"}
                className="rounded-full"
                onClick={() => {
                  handleDeleteTodo(todo.id);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-700" />
              </Button>
            </div>
          </div>
        ))}
        <Toaster theme="dark" />
      </section>
    </PageTransition>
  );
};
