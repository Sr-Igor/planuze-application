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
  if (!TOKEN_COOKIE_NAME) {
    console.error("A variável de ambiente NEXT_PUBLIC_TOKEN_LOCAL não está definida.");

    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  const token = req.cookies.get(TOKEN_COOKIE_NAME);

  const { pathWithoutLocale, locale } = extractPathInfo(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathWithoutLocale);

  if (!isProtectedRoute(pathWithoutLocale)) {
    return intlMiddleware(req) || NextResponse.next();
  }

  const loginUrl = new URL(`/${locale}${AUTH_PREFIX}/login`, req.url);
  const dashboardUrl = new URL(`/${locale}${DASHBOARD_PATH}`, req.url);

  if (token && pathWithoutLocale.startsWith(AUTH_PREFIX)) {
    return NextResponse.redirect(dashboardUrl);
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req) || NextResponse.next();
}

function isProtectedRoute(path: string): boolean {
  return path.startsWith(AUTH_PREFIX) || path === DASHBOARD_PATH;
}

function extractPathInfo(pathname: string): { pathWithoutLocale: string; locale: string } {
  const segments = pathname.split("/");
  const locale = segments[1] || routing.defaultLocale || "pt";

  let pathWithoutLocale: string;

  if (segments.length <= 2) {
    pathWithoutLocale = "/";
  } else {
    pathWithoutLocale = "/" + segments.slice(2).join("/");
  }

  return { pathWithoutLocale, locale };
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|svg).*)"],
};
