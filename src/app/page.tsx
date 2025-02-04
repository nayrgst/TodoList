import { LoginButon } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/CardWrapper";

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-background p-4">
      <CardWrapper
        headerLabel="Organize seu dia, conquiste seus objetivos!"
        className="w-full md:w-[500px]"
        backButtonHref=""
      >
        <section className="space-y-6 text-center">
          <section>
            <LoginButon mode="modal" asChild>
              <Button variant="default" size="lg" className="w-full md:w-auto">
                ENTRAR
              </Button>
            </LoginButon>
          </section>
        </section>
      </CardWrapper>
    </main>
  );
}
