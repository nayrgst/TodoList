import { NextRequest } from "next/server"; // Importe NextRequest
import { auth } from "@/auth";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

export default auth(async function middleware(req: NextRequest) {
  const isLogged = await auth();

  console.log(
    "================ROTA=====================",
    req.nextUrl.pathname,
  );

  console.log("================USUARIO==================", isLogged);

  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return;
  }

  // Caso o usuário esteja lojado ao clicar no botão se entrar ele é redirecionado automaticamente para o dashboard
  if (isAuthRoute) {
    if (isLogged) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
    }
    return;
  }

  // Caso não tenha um login é redirecionado para tela de login automaticamente
  if (!isLogged && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|ico)$).*)",
  ],
};
