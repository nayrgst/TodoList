"use client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { loginWithProvider } from "@/../actions/login";

export const SocialLogin = () => {
  return (
    <section className="flex w-full items-center justify-center gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => loginWithProvider("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>

      <Button
        className="w-full"
        variant="outline"
        onClick={() => loginWithProvider("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        className="w-full"
        variant="outline"
        onClick={() => loginWithProvider("linkedin")}
      >
        <FaLinkedin className="h-5 w-5" />
      </Button>
    </section>
  );
};
