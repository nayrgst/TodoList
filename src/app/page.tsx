import { LoginButon } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/CardWrapper";

export default async function Home() {
  return (
    <main
      className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
    from-purpou to-backBlack"
    >
      <CardWrapper
        headerLabel="Organize seu dia, conquiste seus objetivos!"
        className="w-[500px]"
        backButtonHref=""
      >
        <section className="space-y-6 text-center">
          <section>
            <LoginButon mode="modal" asChild>
              <Button variant="default" size="lg">
                ENTRAR
              </Button>
            </LoginButon>
          </section>
        </section>
      </CardWrapper>
    </main>
  );
}
