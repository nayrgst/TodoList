"use client";
import { Trash2, FilePenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PageTransition from "@/components/PageTransition";

type Todo = {
  id: string;
  userId?: string;
  description: string | null;
  completed: boolean;
};

interface TodolistProps {
  todos: Todo[];
}

export const Todolist = ({ todos }: TodolistProps) => {
  return (
    <PageTransition>
      <section className="p-2 max-w-[1500px] m-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="mb-2 p-3 border rounded-lg bg-black grid grid-cols-[auto_1fr_auto] items-center gap-3"
          >
            <Checkbox className="h-4 w-4" checked={todo.completed || false} />
            <p className="uppercase overflow-hidden whitespace-nowrap overflow-ellipsis">
              {todo.description}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={"ghost"}
                className="rounded-full"
                onClick={() => {
                  console.log("editar");
                }}
              >
                <FilePenLine className="h-4 w-4 text-yellowBlack" />
              </Button>

              <Button
                size="sm"
                variant={"ghost"}
                className="rounded-full"
                onClick={() => {
                  console.log("excluir");
                }}
              >
                <Trash2 className="h-4 w-4 text-red-700" />
              </Button>
            </div>
          </div>
        ))}
      </section>
    </PageTransition>
  );
};
