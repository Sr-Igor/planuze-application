"use client";

import { usePathname } from "next/navigation";

import { ToggleLeft, UserLock } from "lucide-react";

import { profile } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { Button, SidebarProvider } from "@repo/ui";
import { FullScreenMessage } from "@repo/ui/app";

import { Nav } from "@/components/nav";
import { useAccess } from "@/hooks/access";
import { useSignOut } from "@repo/cookies";
import { useAppSelector } from "@repo/redux/hook";
import { cn } from "@repo/ui";

import { AppSidebar } from "./components/app-sidebar";
import { ForbiddenAccess } from "./components/forbidden-access";
import { LockedAccess } from "./components/locked-access";
import { ProfileSwitcher } from "./components/profile-switch";
import { IWarningProps, Warning } from "./components/warning";
import { Provider } from "./context";
import { Chat } from "./modules/chat";

const MainAppLayout = ({
  children,
  warning,
  profile,
}: {
  children: React.ReactNode;
  warning?: Pick<IWarningProps, "type" | "title" | "description">;
  profile?: profile;
}) => {
  const showWarning = warning && profile?.level?.administrator;
  const subscription = profile?.company?.subscriptions?.[0];

  const { open } = useAppSelector((state) => state.warning);
  const { redirect } = useAppSelector((state) => state.modal);

  return (
    <>
      <AppSidebar />
      <main className="relative w-full overflow-hidden">
        {showWarning && <Warning {...warning} subscription={subscription} />}
        {/* <Header /> */}
        <Nav />
        <div
          className={cn(
            "relative mt-[68px] overflow-auto px-5 max-sm:p-0",
            open && showWarning ? "h-[calc(100vh-148px)]" : "h-[calc(100vh-68px)]"
          )}
        >
          {!redirect && children}
        </div>
      </main>
    </>
  );
};

export const PrivateTemplate = ({ children }: { children?: React.ReactNode }) => {
  const {
    isRoleInactive,
    hasNoPermissionsAtAll,
    canAccessCurrentRoute,
    modulesWithAccess,
    warning,
    profile,
    currentFeature,
    hasProfile,
    activeSubscription,
  } = useAccess();

  const { out } = useSignOut();
  const t = useLang();

  const basicRoutes = ["/my_profile"];

  const pathname = usePathname();
  const isBasicAccess = basicRoutes.some((route) => pathname.includes(route));
  const isSubscription = pathname.includes("/subscription");

  if (isRoleInactive) {
    return (
      <FullScreenMessage
        icon={<ToggleLeft size={108} />}
        title={t.warning("level_inactive.title")}
        description={t.warning("level_inactive.description")}
        actions={
          <>
            <ProfileSwitcher />
            <Button variant="destructive" onClick={() => out()}>
              {t.helper("exit")}
            </Button>
          </>
        }
      />
    );
  }

  if (hasNoPermissionsAtAll) {
    return (
      <FullScreenMessage
        icon={<UserLock size={108} />}
        title={t.warning("level_empty.title")}
        description={t.warning("level_empty.description")}
        actions={
          <>
            <ProfileSwitcher />
            <Button variant="destructive" onClick={() => out()}>
              {t.helper("exit")}
            </Button>
          </>
        }
      />
    );
  }

  return (
    <Provider value={{ feature: currentFeature }}>
      <SidebarProvider>
        {hasProfile && (
          <MainAppLayout warning={warning} profile={profile}>
            <>
              {(canAccessCurrentRoute && !warning?.locked) || isBasicAccess ? (
                children
              ) : (
                <>
                  {warning?.locked ? (
                    <>
                      {isSubscription && canAccessCurrentRoute ? (
                        children
                      ) : (
                        <LockedAccess profile={profile} company={profile?.company?.name || ""} />
                      )}
                    </>
                  ) : (
                    <ForbiddenAccess suggestedModules={modulesWithAccess} />
                  )}
                </>
              )}
              {activeSubscription && <Chat />}
            </>
          </MainAppLayout>
        )}
      </SidebarProvider>
    </Provider>
  );
};
