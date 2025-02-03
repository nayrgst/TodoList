"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddTodoSchema } from "@/schemas/todo";
import { toast, Toaster } from "sonner";
import { todo } from "@/actions/todo";

interface InputTodoProps {
  addTodo: (todo: {
    id: string;
    description: string | null;
    completed: boolean;
  }) => void;
}

export const InputTodo = ({ addTodo }: InputTodoProps) => {
  const form = useForm<z.infer<typeof AddTodoSchema>>({
    resolver: zodResolver(AddTodoSchema),
    defaultValues: {
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof AddTodoSchema>) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const result = await todo(values);

    if (result?.success && result.todo) {
      addTodo({
        id: result.todo.id,
        description: result.todo.description,
        completed: result.todo.completed || false,
      });

      toast("Tarefa criada com sucesso!", {
        description: `Data: ${formattedDate} - Hora: ${formattedTime}`,
      });
      form.reset();
    } else {
      toast(result?.error || "Erro ao criar a tarefa.", {
        description: "Tente novamente...",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-screen p-5">
        <section className="gap-x-3 p-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormMessage className="text-red-700" />
                <FormControl>
                  <Input
                    placeholder="O que deseja fazer hoje?"
                    {...field}
                    className="bg-black h-10"
                    aria-label="Digite uma tarefa"
                    aria-invalid={!!form.formState.errors.description}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        <section className="flex justify-end p-3">
          <Button type="submit" variant={"default"} size={"sm"}>
            Adicionar
          </Button>
        </section>
        <Toaster theme="dark" />
      </form>
    </Form>
  );
};
