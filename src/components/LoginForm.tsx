"use client";
import {
  loginWithCredentials,
  loginWithGithub,
  loginWithGoogle,
} from "@/app/api/auth/login/route";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import logoImage from "../../public/background.png";
import PageTransition from "./PageTransition";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await loginWithCredentials(values.email, values.password);

    if (response?.error) {
      toast.error("Erro no Login", {
        description: response.error,
        icon: "❌",
      });
      return;
    }

    if (!response?.error) {
      toast.success("Login bem-sucedido!", {
        description: "Redirecionando para o dashboard...",
        icon: "✅",
      });
      router.push("/dashboard");
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
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <main className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] shadow-xl">
              <section className="flex items-center justify-center py-12 rounded-l-lg bg-backSecondary">
                <section className="mx-auto grid w-[300px] gap-6 p-6">
                  <section className="grid gap-2 text-center">
                    <Image
                      src="/logo.svg"
                      alt="Logo da aplicação"
                      width="250"
                      height="50"
                      className="m-auto"
                    />
                    <h2 className="text-2xl font-semibold">
                      ACESSAR SUA CONTA
                    </h2>
                  </section>
                  <section className="grid gap-4">
                    <section className="grid gap-2">
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
                                  placeholder="exemplo@exemplo.com"
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
                    <section className="grid gap-2">
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
                                  placeholder="*******"
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
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blueMarinho to-blueLight hover:from-blueLight hover:to-blueMarinho text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                    >
                      ENTRAR
                    </Button>
                  </section>
                  <section className="flex space-x-2">
                    <p className="text-textSecondary">
                      Não tem uma conta?{" "}
                      <Link href="/register" className="underline">
                        Criar conta!
                      </Link>
                    </p>
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
              <section className="rounded-r-lg shadow-xl">
                <Image
                  src={logoImage}
                  alt="background da aplicaçao"
                  width="1920"
                  height="1080"
                  className="h-full w-full object-cover rounded-r-lg"
                />
              </section>
            </main>
          </form>
        </Form>
        <Toaster />
      </PageTransition>
    </>
  );
};

export default LoginForm;
