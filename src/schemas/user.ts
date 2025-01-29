import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Preencha o campo Email!")
    .min(1)
    .email("Preencha um email valido!")
    .max(333, "o Email não pode ter mais de 333 caracteres!"),
  password: z.string().min(1, {
    message: "Preencha o campo Senha!",
  }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Preencha o campo Nome!")
      .min(3, "O campo Nome deve ter pelo menos 3 caracteres!"),
    email: z
      .string()
      .nonempty("Preencha o campo Email!")
      .min(1)
      .email("Preencha um email valido!")
      .max(333, "o Email não pode ter mais de 333 caracteres!"),
    password: z
      .string()
      .nonempty("Preencha o campo Senha!")
      .min(6, "A senha deve ter pelo menos 6 caracteres!"),
    confirmPassword: z
      .string()
      .nonempty("Preencha o campo Confirme sua senha!")
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem!",
        path: ["confirmPassword"],
      });
    }
  });
