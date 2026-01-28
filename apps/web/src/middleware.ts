// middleware.ts
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "@repo/language/routing";

const AUTH_PREFIX = "/auth";
const DASHBOARD_PATH = "/dashboard";

const PUBLIC_ROUTES = [
  `${AUTH_PREFIX}/login`,
  `${AUTH_PREFIX}/recovery`,
  `${AUTH_PREFIX}/reset`,
  `${AUTH_PREFIX}/redirect`,
  `${AUTH_PREFIX}/error`,
  `${AUTH_PREFIX}/register`,
  `/config/code/recovery`,
  "/plans",
  "/initial",
];

const TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_LOCAL;
const USER_COOKIE_NAME = process.env.NEXT_PUBLIC_USER_LOCAL;

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  if (!TOKEN_COOKIE_NAME) {
    console.error("A variável de ambiente NEXT_PUBLIC_TOKEN_LOCAL não está definida.");
    return response;
  }

  const { pathname } = req.nextUrl;
  const token = req.cookies.get(TOKEN_COOKIE_NAME);
  const userInfos = JSON.parse(req.cookies.get(USER_COOKIE_NAME!)?.value || "{}");

  const { pathWithoutLocale, locale } = extractPathInfo(pathname);

  // URLs com locale
  const loginUrl = new URL(`/${locale}/${AUTH_PREFIX}/login`, req.url);
  const confirmUrl = new URL(`/${locale}/config/code/confirm`, req.url);
  const welcomeUrl = new URL(`/${locale}/config/welcome`, req.url);
  const plansUrl = new URL(`/${locale}/plans`, req.url);
  const dashboardUrl = new URL(`/${locale}${DASHBOARD_PATH}`, req.url);
  const redirectUrl = new URL(`/${locale}${AUTH_PREFIX}/redirect`, req.url);

  // Verifica se já está na rota correta antes de redirecionar (evita loops)
  if (
    token &&
    pathWithoutLocale.startsWith(AUTH_PREFIX) &&
    pathname !== dashboardUrl.pathname &&
    pathname !== redirectUrl.pathname
  ) {
    return NextResponse.redirect(dashboardUrl);
  }

  if (userInfos?.confirm && pathname !== confirmUrl.pathname) {
    return NextResponse.redirect(confirmUrl);
  }

  if (userInfos?.welcome && !userInfos?.confirm && pathname !== welcomeUrl.pathname) {
    return NextResponse.redirect(welcomeUrl);
  }

  if (
    userInfos?.plans &&
    !userInfos?.confirm &&
    !userInfos?.welcome &&
    pathname !== plansUrl.pathname &&
    pathWithoutLocale !== "/hidrate"
  ) {
    return NextResponse.redirect(plansUrl);
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
