"use client";

import * as React from "react";
import { useMemo } from "react";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  PlusCircle,
  ShieldBan,
  Ticket,
  UserCog,
} from "lucide-react";

import { invite, profile as TProfile } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
Img
} from "@repo/ui";
import { AppTooltip } from "@repo/ui/app";

import { useAccess } from "@/hooks/access";
import { useSignOut } from "@repo/cookies";
import { useModal } from "@/hooks/modal";
import { useAppSelector } from "@repo/redux/hook";
import { cn } from "@repo/ui";
import { Pagination } from "@/types/pagination";

interface NavUserProps {
  variant?: "large" | "small";
  useSide?: () => { isMobile?: boolean };
  intermediate?: boolean;
}

export interface IWrapperProps {
  intermediate?: boolean;
  children: React.ReactNode;
}

export function NavUser({
  variant = "large",
  useSide = useSidebar,
  intermediate = true,
}: NavUserProps) {
  const { isMobile } = useSide();
  const { user, profile: activeProfile } = useAccess();
  const { all } = useAppSelector((state) => state.module);
  const { out } = useSignOut();
  const route = useRouter();

  const queryClient = useQueryClient();
  const invites = queryClient.getQueryData(["invite_me", {}]) as Pagination<invite>;
  const pendingInvites = invites?.data?.filter(
    (invite: invite) =>
      invite.accepted === null &&
      invite.expire_date &&
      differenceInDays(new Date(invite.expire_date), new Date()) >= 0
  )?.length;

  const t = useLang();

  const { setModal } = useModal();

  const userFallback = useMemo(() => {
    return user?.name ? user.name[0].toUpperCase() : "U";
  }, [user?.name]);

  return (
    <Wrapper intermediate={intermediate}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            // size='lg'
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <Img
                src={user?.avatar || ""}
                alt={user?.name || "-"}
                path="user/avatar"
                publicFile={true}
                fill
                fallback={<AvatarFallback className="rounded-lg">{userFallback}</AvatarFallback>}
              />
            </Avatar>

            {variant === "large" && (
              <>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name || "-"}</span>{" "}
                  <span className="truncate text-xs">{user?.email || "-"}</span>{" "}
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-68 min-w-56 rounded-lg"
          side={isMobile || variant === "small" ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <Img
                  src={user?.avatar || ""}
                  alt={user?.name || "-"}
                  path="user/avatar"
                  publicFile={true}
                  fill
                  fallback={<AvatarFallback className="rounded-lg">{userFallback}</AvatarFallback>}
                />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name || "-"}</span>
                <span className="truncate text-xs">{user?.email || "-"}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <span className="text-muted-foreground text-[0.7rem] font-semibold">
                {t.helper("company_profile")}
              </span>
            </DropdownMenuLabel>
            {user?.profiles?.map((p: TProfile) => {
              const companyFallback = p.company?.name ? p.company.name[0].toUpperCase() : "C";

              return (
                <DropdownMenuItem
                  key={p.id}
                  onClick={() => {
                    if (p.id !== activeProfile?.id) {
                      const personalModule = all.find((m) => m.title === "personal");
                      route.push(`/hidrate?profileId=${p.id}&moduleId=${personalModule?.id}`);
                    }
                  }}
                  className={cn(
                    "flex items-center justify-between gap-2 px-2 py-3",
                    p.id === activeProfile?.id ? "bg-muted text-foreground" : ""
                  )}
                >
                  <span className="relative flex items-center gap-2 text-xs">
                    <Avatar className="h-[20px] w-[20px] rounded-lg">
                      <Img
                        src={p.company?.logo || ""}
                        alt={p.company?.name || "logo"}
                        path="company/logo"
                        publicFile={true}
                        width={20}
                        height={20}
                        className="rounded-lg border"
                        skipDefault
                        fallback={
                          <AvatarFallback className="rounded-lg text-xs">
                            {companyFallback}
                          </AvatarFallback>
                        }
                      />
                    </Avatar>
                    {p.company?.name || "-"}
                  </span>
                  {p.active ? (
                    <BadgeCheck
                      className={cn(
                        "size-4",
                        p.id === activeProfile?.id ? "text-green-500" : "text-gray-400"
                      )}
                    />
                  ) : (
                    <AppTooltip text="Este perfil está inativo.">
                      <ShieldBan className="size-4 text-red-500" />
                    </AppTooltip>
                  )}
                </DropdownMenuItem>
              );
            })}
            {intermediate && (
              <DropdownMenuItem
                onClick={() => {
                  route.push("/config/welcome");
                }}
                className={cn("flex items-center justify-between gap-2 px-2 py-3")}
              >
                <span className="flex items-center gap-2 text-xs font-semibold">
                  <PlusCircle className="size-4" />
                  {t.helper("new_company")}
                </span>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          {intermediate && (
            <DropdownMenuItem
              onClick={() => {
                route.push("/my_profile");
              }}
            >
              <UserCog className="mr-2 size-4" />
              {t.helper("my_profile")}
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              setModal({ invite: true });
            }}
            className="flex items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <Ticket className="mr-2 size-4" />
              {t.helper("invites")}
            </span>

            {pendingInvites > 0 && (
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                <span className="text-xs font-bold text-white">{pendingInvites}</span>
              </div>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => out()} variant="destructive">
            <LogOut className="mr-2 size-4" />
            {t.helper("exit")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Wrapper>
  );
}

const Wrapper = ({ intermediate, children }: IWrapperProps) => {
  if (intermediate) {
    return children;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>{children}</SidebarMenuItem>
    </SidebarMenu>
  );
};
