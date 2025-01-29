import { auth, signOut } from "@/auth";
import PageTransition from "@/components/PageTransition";
import Image from "next/image";

const Dashboard = async () => {
  const session = await auth();
  const image = session?.user?.image;

  return (
    <PageTransition>
      <section>
        <Image
          src={image ?? "/default-image.svg"}
          alt="Imagem de usuário"
          width="500"
          height="500"
        />

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/auth/login" });
          }}
        >
          <button type="submit">Sair</button>
        </form>
        <p>Bem-vindo ao seu painel de controle!</p>
      </section>
    </PageTransition>
  );
};
export default Dashboard;
