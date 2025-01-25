"use client";
import { logout } from "@/app/api/auth/login/route"; // Importe a função de logout
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import PageTransition from "./PageTransition";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logout();

    if (response?.error) {
      toast.error("Erro", {
        description: response.error, // Exibe a mensagem de erro
      });
    } else {
      toast.success("Logout bem-sucedido!", {
        description: "Redirecionando para a página de login...",
      });
      router.push("/login"); // Redireciona para a página de login após o logout
    }
  };

  return (
    <PageTransition>
      <div>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao seu painel de controle!</p>
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
        >
          Sair
        </Button>
        <Toaster />
      </div>
    </PageTransition>
  );
}
