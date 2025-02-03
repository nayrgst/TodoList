import { z } from "zod";

export const TodoSchema = z.object({
  description: z.string().min(1, {
    message: "A tarefa não pode estar vazia!",
  }),
});
