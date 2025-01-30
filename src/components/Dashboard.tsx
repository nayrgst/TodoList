"use client";
import PageTransition from "@/components/PageTransition";
import { useSession } from "next-auth/react";
import { logout } from "../../actions/logout";
const Dashboard = () => {
  const session = useSession();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <PageTransition>
      <section>
        <pre>{JSON.stringify(session?.data?.user)}</pre>

        <button onClick={handleLogout} type="submit">
          Sair
        </button>
        <p>Bem-vindo ao seu painel de controle!</p>
      </section>
    </PageTransition>
  );
};
export default Dashboard;
