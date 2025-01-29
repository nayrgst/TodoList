// import { Poppins } from "next/font/google";
// import { cn } from "@/lib/utils";
import Image from "next/image";

interface LoginHeaderProps {
  label?: string;
}

// const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export const LoginHeader = ({ label }: LoginHeaderProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-y-4">
      <Image
        src="../../logo.svg"
        alt="Logo da aplicação"
        width="350"
        height="150"
        className="drop-shadow-md"
      />
      <h1 className="text-muted-foreground text-lg text-center">{label}</h1>
    </section>
  );
};
