"use client";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/LoginForm";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButon = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  if (mode == "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className=" flex justify-center items-center m-auto p-0 bg-transparent border-none">
          <DialogTitle className="text-center"></DialogTitle>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={handleLogin} className="cursor-pointer">
      {children}
    </span>
  );
};
