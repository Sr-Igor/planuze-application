"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { LogOutIcon } from "lucide-react";

import { useClean } from "@repo/cookies";
import { useLang } from "@repo/language/hooks";
import {
  AppTheme,
  Button,
  Icon,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui";

import { TeamSwitcher } from "@/components/app-team-switcher";

export interface AppSidebarProps {}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  const router = useRouter();
  const t = useLang();

  const { clean } = useClean();

  const routes = [
    {
      label: t.label("dashboard"),
      path: "dashboard",
      icon: "LayoutDashboard",
    },
    // {
    //     label: t.label('companies'),
    //     path: 'company',
    //     icon: 'Building2'
    // },
    {
      label: t.label("action"),
      path: "action",
      icon: "Pickaxe",
    },
    {
      label: t.label("features"),
      path: "feature",
      icon: "Atom",
    },
    {
      label: t.label("plans"),
      path: "plan",
      icon: "TicketsPlane",
    },
    {
      label: t.label("modules"),
      path: "module",
      icon: "Package",
    },
    {
      label: t.label("billing_error"),
      path: "billing_error",
      icon: "TicketX",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.path}>
                <SidebarMenuButton onClick={() => router.push(`/${route.path}`)}>
                  <span className="flex items-center gap-2">
                    <Icon name={route.icon || "Circle"} className="mr-2" size={16} />
                    <span>{route.label}</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-end justify-between">
        <AppTheme />
        <Button
          onClick={() => {
            console.log("Out click");
            clean();
          }}
          className="w-full"
          variant="destructive"
        >
          <LogOutIcon />
          <span>{t.helper("exit")}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
