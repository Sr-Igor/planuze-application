// middleware.ts
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "@repo/language/routing";

const AUTH_PREFIX = "/auth";
const DASHBOARD_PATH = "/dashboard";

const PUBLIC_ROUTES = [`${AUTH_PREFIX}/login`];

const TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_LOCAL;

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  if (!TOKEN_COOKIE_NAME) {
    console.error("A variável de ambiente NEXT_PUBLIC_TOKEN_LOCAL não está definida.");
    return response;
  }

  const { pathname } = req.nextUrl;
  const token = req.cookies.get(TOKEN_COOKIE_NAME);

  const { pathWithoutLocale, locale } = extractPathInfo(pathname);

  // URLs com locale
  const dashboardUrl = new URL(`/${locale}${DASHBOARD_PATH}`, req.url);
  const loginUrl = new URL(`/${locale}/${AUTH_PREFIX}/login`, req.url);

  // Verifica se já está na rota correta antes de redirecionar (evita loops)
  if (token && pathWithoutLocale.startsWith(AUTH_PREFIX) && pathname !== dashboardUrl.pathname) {
    return NextResponse.redirect(dashboardUrl);
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathWithoutLocale);

  if (!token && !isPublicRoute && pathname !== loginUrl.pathname) {
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

function extractPathInfo(pathname: string): { pathWithoutLocale: string; locale: string } {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] || routing.defaultLocale;

  if (!routing.locales.includes(locale as any)) {
    return { pathWithoutLocale: pathname, locale: routing.defaultLocale };
  }

  let pathWithoutLocale: string;

  if (segments.length <= 1) {
    pathWithoutLocale = "/";
  } else {
    pathWithoutLocale = "/" + segments.slice(1).join("/");
  }

  return { pathWithoutLocale, locale };
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|svg|sw.js).*)"],
};
