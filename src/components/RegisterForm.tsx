"use client";
import { loginWithGithub, loginWithGoogle } from "@/app/api/auth/login/route";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import PageTransition from "./PageTransition";

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = response.headers
        .get("Content-Type")
        ?.includes("application/json")
        ? await response.json()
        : null;

      if (response.ok) {
        toast.success("Usuário criado com sucesso!");
        form.reset({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          router.push("/login");
        }, 500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        `Falha no servidor: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  const handleGoogleLogin = async () => {
    const response = await loginWithGoogle();
    if (response?.error) {
      toast.error("Erro no Login com Google", {
        description: response.error,
        icon: "❌",
      });
    }
  };

  const handleGithubLogin = async () => {
    const response = await loginWithGithub();
    if (response?.error) {
      toast.error("Erro no Login com GitHub", {
        description: response.error,
        icon: "❌",
      });
    }
  };

  return (
    <>
      <PageTransition>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <main className="w-full lg:grid lg:min-h-[600px] xl:min-h-[800px] shadow-xl">
              <section className="flex items-center justify-center py-12 rounded-lg bg-backSecondary">
                <section className="mx-auto grid w-[500px] gap-6 p-6">
                  <h2 className="text-2xl font-semibold">CRIAR CONTA</h2>
                  <section className="grid gap-3">
                    <section className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome:</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="* Gustavo Mateus João de Thiago"
                                  {...field}
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </section>

                    <section className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="* exemplo@exemplo.com"
                                  {...field}
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </section>

                    <section className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha:</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="* 123456"
                                  type="password"
                                  {...field}
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </section>

                    <section className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirme sua senha:</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="* 123456"
                                  type="password"
                                  {...field}
                                  className="pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </section>
                    <FormDescription>(*) Campos obrigatórios!</FormDescription>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-redead to-red hover:from-red hover:to-redead text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                    >
                      {isSubmitting ? "CRIANDO CONTA..." : "CRIAR CONTA"}
                    </Button>
                    <section className="flex space-x-2">
                      <p className="text-textSecondary">
                        Tem uma conta?{" "}
                        <Link href="/login" className="underline">
                          ENTRAR
                        </Link>
                      </p>
                    </section>
                  </section>
                  <span className="m-auto">OU</span>
                  <Button onClick={handleGoogleLogin} className="w-full">
                    <FcGoogle className="h-5 w-5" />
                    Entrar com Google
                  </Button>
                  <Button onClick={handleGithubLogin} className="w-full">
                    <FaGithub className="h-5 w-5" />
                    Entrar com GitHub
                  </Button>
                </section>
              </section>
            </main>
          </form>
        </Form>
        <Toaster />
      </PageTransition>
    </>
  );
};

export default RegisterForm;
