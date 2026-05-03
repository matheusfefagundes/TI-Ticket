import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { findMatchingRoute, routePermissions } from "./lib/routes";

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const currentPath = request.nextUrl.pathname;
  const userRole = token?.role;

  // 1. Redirecionamento de utilizadores autenticados que tentam aceder à Home (/)
  if (token && currentPath === "/") {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin/tickets", request.url));
    } else if (userRole === "technical") {
      return NextResponse.redirect(new URL("/technician/tickets", request.url));
    } else {
      return NextResponse.redirect(new URL("/portal/tickets", request.url));
    }
  }

  // 2. Verificação de permissões de rota (RBAC)
  const matchingRoute = findMatchingRoute(currentPath);

  // Se a rota não estiver mapeada no routes.ts, permite o acesso
  if (!matchingRoute) {
    return NextResponse.next();
  }

  const allowedRoles = routePermissions[matchingRoute as keyof typeof routePermissions];

  // Se a rota for pública (allowedRoles vazio), permite o acesso
  if (allowedRoles.length === 0) {
    return NextResponse.next();
  }

  // 3. Proteção: Utilizador não autenticado tentando aceder a rota privada
  if (!token) {
    const url = new URL("/", request.url);
    url.searchParams.set("callbackUrl", currentPath);
    url.searchParams.set("expired", "true");
    return NextResponse.redirect(url);
  }

  // 4. Proteção: Utilizador autenticado mas sem a Role necessária
  if (userRole && !(allowedRoles as string[]).includes(userRole as string)) {
    // Redireciona para uma página de erro ou de volta para o seu painel padrão
    let redirectUrl = "/portal/tickets";
    if (userRole === "admin") redirectUrl = "/admin/tickets";
    if (userRole === "technical") redirectUrl = "/technician/tickets";

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

// Configuração do Matcher para evitar que o middleware corra em ficheiros estáticos/imagens
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (svg, png, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icons|Logo|Login_Background).*)",
  ],
};