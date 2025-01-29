import { ErrorCard } from "@/components/auth/ErrorCard";
import PageTransition from "@/components/PageTransition";

const errorPage = () => {
  return (
    <PageTransition>
      <ErrorCard />
    </PageTransition>
  );
};
export default errorPage;
