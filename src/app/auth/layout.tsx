const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-full items-center justify-center bg-background">
      {children}
    </section>
  );
};
export default authLayout;
