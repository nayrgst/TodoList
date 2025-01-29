"use client";
import PageTransition from "@/components/PageTransition";
import { signOut, useSession } from "next-auth/react";
const Dashboard = () => {
  const { data: session } = useSession();

  const logout = () => {
    signOut();
  };

  return (
    <PageTransition>
      <section>
        {JSON.stringify(session)}

        <button onClick={logout} type="submit">
          Sair
        </button>
        <p>Bem-vindo ao seu painel de controle!</p>
      </section>
    </PageTransition>
  );
};
export default Dashboard;
