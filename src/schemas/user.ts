import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Preencha o campo Email!")
    .min(1)
    .email("Preencha um email valido!")
    .max(333, "o Email não pode ter mais de 333 caracteres!"),
  password: z
    .string()
    .nonempty("O campo Senha é obrigatório!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!"),
});

export const userSchema = z.object({
  name: z
    .string()
    .nonempty("O campo Nome é obrigatório")
    .min(3, "O campo Nome deve ter pelo menos 3 caracteres!"),
  email: z
    .string()
    .nonempty("Preencha o campo Email!")
    .min(1)
    .email("Preencha um email valido!")
    .max(333, "o Email não pode ter mais de 333 caracteres!"),
  password: z
    .string()
    .nonempty("O campo Senha é obrigatório!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!"),
});

// Schema extendido para o frontend (inclui confirmação de senha)
export const registerSchema = userSchema
  .extend({
    confirmPassword: z
      .string()
      .nonempty("O campo Confirme sua Senha é obrigatório!")
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
