"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { BackButton } from "@/components/auth/BackButton";
import { ImagePage } from "@/components/auth/ImagePage";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel?: string;
  backButtonHref: string;
  showSocialButtons?: boolean;
  showImageBg?: boolean;
  className?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocialButtons,
  showImageBg,
  className,
}: CardWrapperProps) => {
  return (
    <Card className={cn("flex shadow-md", className)}>
      <section
        className={cn("p-6 w-full", {
          "w-1/2": showImageBg,
        })}
      >
        <CardHeader>
          <LoginHeader label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocialButtons && (
          <CardFooter className="p-0">
            <SocialLogin />
          </CardFooter>
        )}

        <CardFooter className="p-0">
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </section>

      {showImageBg && (
        <section className="w-1/2 relative">
          <ImagePage />
        </section>
      )}
    </Card>
  );
};
