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
import { FormSchema } from "@/schemas/todo";
import { toast, Toaster } from "sonner";

export const InputTodo = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  });

  function onSubmit() {
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

    toast("Tarefa criada com sucesso!", {
      description: `Data: ${formattedDate} - Hora: ${formattedTime}`,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-screen p-5">
        <section className="gap-x-3 p-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormMessage className=" text-red-700" />
                <FormControl>
                  <Input
                    placeholder="Oque deseja fazer hoje?"
                    {...field}
                    className="bg-black"
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
        <Toaster className="bg-black" />
      </form>
    </Form>
  );
};
