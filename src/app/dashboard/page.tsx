import Dashboard from "@/components/Dashboard";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="container h-screen flex items-center justify-center">
      <div className="w-[800px]">
        <Dashboard />
      </div>
    </section>
  );
};

export default page;
