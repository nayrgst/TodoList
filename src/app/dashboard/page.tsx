"use client";

import PageTransition from "@/components/PageTransition";
import { InputTodo } from "@/app/dashboard/_components/InputTodo";

const Dashboard = () => {
  return (
    <PageTransition>
      <section>
        <InputTodo />
      </section>
    </PageTransition>
  );
};

export default Dashboard;
