import { ShieldAlert } from "lucide-react";
import { CardWrapper } from "./CardWrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Ops!! Algo deu errado."
      backButtonLabel="Voltar para tela de login!"
      backButtonHref="/auth/login"
    >
      <section className="w-full flex justify-center items-center">
        <ShieldAlert className="size-20 text-red-600" />
      </section>
    </CardWrapper>
  );
};
