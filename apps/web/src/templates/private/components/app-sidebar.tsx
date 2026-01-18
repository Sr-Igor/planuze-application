"use client";

import * as React from "react";
import { useMemo } from "react";

import { usePathname, useRouter } from "next/navigation";

import * as lucideIcons from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui";
import { AppTheme, Icon } from "@repo/ui/app";

import { AppLanguage } from "@/components/language";
import { ModuleSwitcher } from "@/components/app-module-switcher";
import { useAccess } from "@/hooks/access";
import { FeatureWithActions, ModuleWithFeatures } from "@/hooks/access/types";

import { NavUser } from "./nav-user";

interface GroupedSidebarItems {
  [groupKey: string]: FeatureWithActions[];
}

export interface AppSidebarProps {}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useLang();

  const { access, module } = useAccess();

  const sidebarFeatures = useMemo(() => {
    if (!module || !access) {
      return [];
    }

    const moduleAccess: ModuleWithFeatures | undefined = access[module.id];
    if (!moduleAccess) {
      return [];
    }

    return moduleAccess.features.filter(
      (feature: FeatureWithActions) =>
        feature.sidebar && feature.actions.some((action) => ["index", "show"].includes(action))
    ) as FeatureWithActions[];
  }, [module, access]);

  const groupedSidebarItems = useMemo(() => {
    const grouped: GroupedSidebarItems = sidebarFeatures.reduce(
      (acc: GroupedSidebarItems, item: FeatureWithActions) => {
        const groupKey = item.group || "__UNGROUPED__";
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
      },
      {}
    );

    return grouped;
  }, [sidebarFeatures]);

  const isItemActive = useMemo(() => {
    return (item: FeatureWithActions): boolean => {
      const itemPath = item.route || item.path;
      if (!itemPath) return false;

      const normalizedPathname = pathname.replace(/\/$/, "");

      const pathnameWithoutQuery = normalizedPathname.split("?")[0].split("#")[0];

      const pathSegments = pathnameWithoutQuery.split("/").filter(Boolean);

      const pathWithoutLocale = pathSegments.slice(1);

      const normalizedItemPath = itemPath.replaceAll(/^\/+|\/+$/g, "");
      const itemSegments = normalizedItemPath.split("/").filter(Boolean);

      if (pathWithoutLocale.length >= itemSegments.length) {
        const matches = itemSegments.every(
          (segment, index) => segment === pathWithoutLocale[index]
        );
        return matches;
      }

      return false;
    };
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ModuleSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {Object.keys(groupedSidebarItems).map((groupKey) => {
              const items = groupedSidebarItems[groupKey];

              if (groupKey !== "__UNGROUPED__" && items.length > 1) {
                const hasActiveItem = items.some((item) => isItemActive(item));

                return (
                  <Collapsible
                    key={groupKey}
                    asChild
                    className="group/collapsible"
                    defaultOpen={hasActiveItem}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="hover:bg-sidebar-accent/80 cursor-pointer transition-all duration-200">
                          <lucideIcons.LayersIcon className="mr-2 size-4 transition-transform duration-200" />
                          <span>{t.navBar(`groups.${groupKey}`)}</span>
                          <lucideIcons.ChevronRightIcon className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {items.map((subItem: FeatureWithActions) => {
                            const active = isItemActive(subItem);
                            return (
                              <SidebarMenuSubItem key={subItem.path}>
                                <SidebarMenuSubButton
                                  isActive={active}
                                  onClick={() => router.push(`/${subItem.route || subItem.path}`)}
                                  className="hover:bg-sidebar-accent/80 cursor-pointer transition-all duration-200"
                                >
                                  <Icon
                                    name={subItem.icon || "Circle"}
                                    className="mr-2 h-4 w-4 transition-transform duration-200"
                                  />
                                  <p>{t.navBar(`labels.${subItem.path}`)}</p>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              } else {
                return items.map((item: FeatureWithActions) => {
                  const active = isItemActive(item);
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        isActive={active}
                        onClick={() => router.push(`/${item.route || item.path}`)}
                        className="hover:bg-sidebar-accent/80 cursor-pointer transition-all duration-200"
                      >
                        <span className="flex items-center gap-2">
                          <Icon
                            name={item.icon || "Circle"}
                            className="mr-2 transition-transform duration-200"
                            size={16}
                          />
                          <span>{t.navBar(`labels.${item.path}`)}</span>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                });
              }
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-end justify-between">
        <span className="flex items-center gap-2">
          <AppLanguage />
          <AppTheme />
        </span>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
