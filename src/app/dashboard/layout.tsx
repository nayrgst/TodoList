import { Navbar } from "@/app/dashboard/_components/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <section className="w-full h-full bg-background">
      <Navbar />
      {children}
    </section>
  );
};
export default DashboardLayout;
