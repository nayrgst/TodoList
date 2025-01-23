"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
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
  confirmPassword: z
  .string()
  .nonempty("O campo Confirme sua Senha é obrigatório!")
  .min(6, "A senha deve ter pelo menos 6 caracteres"),
}).superRefine(({password, confirmPassword}, ctx) => {
  if (password!== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não coincidem!",
      path: ["confirmPassword"],    
    })
  }
})

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {    
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome:</FormLabel>
              <FormControl>
                <Input placeholder="* Gustavo Mateus João de Thiago" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="* exemplo@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha:</FormLabel>
              <FormControl>
                <Input placeholder="* 123456" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme sua senha:</FormLabel>
              <FormControl>
                <Input placeholder="* 123456" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registrar</Button>
        <FormDescription>
          (*) Campos obrigatórios!  
        </FormDescription>
      </form>
    </Form>
  )
}

export default RegisterForm