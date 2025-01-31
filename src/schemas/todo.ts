import { z } from "zod";

export const AddTodoSchema = z.object({
  description: z.string().min(1, {
    message: "A tarefa não pode estar vazia!",
  }),
});
