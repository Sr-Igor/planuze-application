import { useMemo } from "react";

import { usePathname, useRouter } from "next/navigation";

import { ChevronLeft, HousePlus, LogInIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Link } from "@repo/language/navigation";
import { useAuth } from "@repo/redux/hook";
import { AppLogo, AppTheme, Button, cn, SidebarTrigger } from "@repo/ui";

import { NavUser } from "@/templates/private/components/nav-user";
import { Notifications } from "@/templates/private/modules/notification";

import { AppLanguage } from "./language";

export interface INavProps {
  intermediate?: boolean;
}

export const Nav = ({ intermediate = true }: INavProps) => {
  const t = useLang();

  const className = intermediate
    ? " bg-sidebar absolute pr-10 z-1 w-full shadow-sm shadow-foreground/10"
    : "container";

  const pathname = usePathname();
  const route = useRouter();
  const { user } = useAuth();

  const backPaths = ["/show/", "trash", "/index/"];

  const canGoBack = useMemo(() => {
    return backPaths.some((path) => pathname.includes(path)) && window.history.length > 1;
  }, [pathname]);
  // "bg-background/95 supports-backdrop-filter:bg-background/10 shadow-foreground sticky top-0 z-50 w-full backdrop-blur"
  return (
    <nav className="supports-backdrop-filter:bg-muted-foreground/5 sticky top-0 z-50 w-full backdrop-blur">
      <div className={cn("mx-auto flex h-16 items-center justify-between px-4", className)}>
        <span className="flex items-center gap-2">
          {intermediate && <SidebarTrigger />}
          {!intermediate && <AppLogo width={80} height={80} className="ml-5" />}
          {canGoBack && (
            <Button variant={"ghost"} onClick={route.back}>
              <ChevronLeft />
              {t.helper("back")}
            </Button>
          )}
        </span>

        <span className="flex items-center gap-2">
          {!!user?.id && (
            <span className="flex items-center gap-2">
              <Notifications />
              <NavUser
                variant="small"
                intermediate={intermediate}
                useSide={() => ({ isMobile: false })}
              />
            </span>
          )}

          {!user?.id && (
            <div className="flex items-center gap-4">
              <Link href="/plans">
                <Button variant="ghost">{t.page.lp("nav.plans")}</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">
                  <LogInIcon />
                  {t.page.lp("nav.login")}
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button>
                  <HousePlus />
                  {t.page.lp("nav.start_free")}
                </Button>
              </Link>
              <AppLanguage />
            </div>
          )}
          <AppTheme />
        </span>
      </div>
    </nav>
  );
};
