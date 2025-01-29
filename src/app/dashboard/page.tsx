import Dashboard from "@/components/Dashboard";

const page = async () => {
  return (
    <section className="container h-screen flex items-center justify-center">
      <div className="w-[800px]">
        <Dashboard />
      </div>
    </section>
  );
};

export default page;
