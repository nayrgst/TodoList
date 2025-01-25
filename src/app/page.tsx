import Dashboard from "@/components/Dashboard";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="container flex items-center justify-center py-5">
      <section>
        <Dashboard />
      </section>
    </main>
  );
}
