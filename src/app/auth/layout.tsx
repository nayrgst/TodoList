const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
    from-purpou to-backBlack"
    >
      {children}
    </section>
  );
};
export default authLayout;
