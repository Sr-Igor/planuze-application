import { useMemo } from "react";

import { usePathname, useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, SidebarTrigger } from "@repo/ui";

import * as classes from "./styles";

export const Header = () => {
  const t = useLang();
  const route = useRouter();
  const pathname = usePathname();

  const backPaths = ["/show/", "trash"];

  const canGoBack = useMemo(() => {
    return backPaths.some((path) => pathname.includes(path));
  }, [pathname]);

  return (
    <header className={classes.header}>
      <SidebarTrigger />
      {canGoBack && (
        <Button variant={"ghost"} onClick={route.back}>
          <ChevronLeft />
          {t.helper("back")}
        </Button>
      )}
    </header>
  );
};
