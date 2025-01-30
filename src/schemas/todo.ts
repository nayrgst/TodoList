import { z } from "zod";

export const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Escreva uma tarefa!",
  }),
});
