"use client";

import * as React from "react";

import { useAppSelector } from "@repo/redux/hook";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Icon,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui";

export function TeamSwitcher() {
  const admin = useAppSelector((state) => state.admin);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Icon name={"Cog"} className="size-4 shrink-0" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{"Administrator Panel"}</span>{" "}
                <span className="truncate font-medium">{admin?.name}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
