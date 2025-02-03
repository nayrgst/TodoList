"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TodoSchema } from "@/schemas/todo";
import { toast, Toaster } from "sonner";
import { createTodo } from "@/actions/todo";
import { useState } from "react";

interface InputTodoProps {
  addTodo: (todo: {
    id: string;
    description: string | null;
    completed: boolean;
  }) => void;
}

const formatDateTime = () => {
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
  return { formattedDate, formattedTime };
};

export const InputTodo = ({ addTodo }: InputTodoProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
    setLoading(true);
    const { formattedDate, formattedTime } = formatDateTime();

    try {
      const result = await createTodo(values);

      if (result?.success && result.todo) {
        addTodo({
          id: result.todo.id,
          description: result.todo.description,
          completed: result.todo.completed || false,
        });

        toast("✅ TAREFA CRIADA COM SUCESSO!", {
          description: `Data: ${formattedDate} - Hora: ${formattedTime}`,
        });
        form.reset();
      } else {
        toast(result?.error || "Erro ao criar a tarefa.", {
          description: "Tente novamente...",
        });
      }
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
      toast("Erro ao criar a tarefa.", {
        description: "Tente novamente...",
      });
    } finally {
      setLoading(false);
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
                    aria-describedby="description-error"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        <section className="flex justify-end p-3">
          <Button
            type="submit"
            variant="default"
            size="sm"
            disabled={loading}
            aria-label={loading ? "Adicionando tarefa..." : "Adicionar tarefa"}
          >
            {loading ? (
              <span className="flex items-center gap-x-1">
                <Loader className="animate-spin" />
                Adicionando...
              </span>
            ) : (
              "Adicionar"
            )}
          </Button>
        </section>
        <Toaster theme="dark" />
      </form>
    </Form>
  );
};
