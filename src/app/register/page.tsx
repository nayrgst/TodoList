import RegisterForm from "@/components/RegisterForm";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const page = async () => {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="m-auto container h-screen flex items-center justify-center">
      <div className="w-[800px]">
        <RegisterForm />
      </div>
    </section>
  );
};

export default page;
