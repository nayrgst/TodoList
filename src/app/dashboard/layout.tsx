import { Navbar } from "@/app/dashboard/_components/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <section className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purpou to-backBlack">
      <Navbar />
      {children}
    </section>
  );
};
export default DashboardLayout;
