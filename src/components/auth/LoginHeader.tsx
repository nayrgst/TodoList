import Image from "next/image";

import Logo from "@/public/logo.svg";

interface LoginHeaderProps {
  label?: string;
}

export const LoginHeader = ({ label }: LoginHeaderProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-4">
      <Image
        src={Logo}
        alt="Logo da aplicação"
        width="350"
        height="150"
        className="drop-shadow-md"
      />
      <h1 className="text-muted-foreground text-lg text-center">{label}</h1>
    </section>
  );
};
