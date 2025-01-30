"use client";
import Image from "next/image";

import Logo from "@/public/logo.svg";
import { UserButton } from "@/components/auth/UserButton";

export const Navbar = () => {
  return (
    <nav className="bg-backBlack flex justify-between items-center shadow-sm">
      <section className="flex gap-x-2 justify-center items-center w-full ms-14">
        <Image
          src={Logo}
          alt="Logo da aplicação"
          width="150"
          className="drop-shadow-md"
        />
      </section>
      <section className="me-10">
        <UserButton />
      </section>
    </nav>
  );
};
