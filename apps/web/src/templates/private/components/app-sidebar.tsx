"use client";

import * as React from "react";
import { useMemo, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import * as lucideIcons from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { useAppSelector } from "@repo/redux/hooks";
import {
  AppTheme,
  cn,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useSidebar,
} from "@repo/ui";

import { ModuleSwitcher } from "@/components/app-module-switcher";
import { AppLanguage } from "@/components/language";
import { useAccess } from "@/hooks/access";
import { FeatureWithActions, ModuleWithFeatures } from "@/hooks/access/types";

import { NavUser } from "./nav-user";

interface GroupedSidebarItems {
  [groupKey: string]: FeatureWithActions[];
}

export interface AppSidebarProps {}

/**
 * NavItem - Modern pill-style navigation item
 */
function NavItem({
  item,
  isActive,
  onClick,
  t,
}: {
  item: FeatureWithActions;
  isActive: boolean;
  onClick: () => void;
  t: ReturnType<typeof useLang>;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5",
        "transition-all duration-200 ease-out",
        "hover:bg-sidebar-accent/60",
        isActive && ["bg-sidebar-accent text-sidebar-accent-foreground", "shadow-sm"]
      )}
    >
      {/* Active indicator bar */}
      <span
        className={cn(
          "absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full",
          "bg-primary transition-all duration-300",
          isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      />

      {/* Icon with glow effect on active */}
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
          "transition-all duration-200",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
        )}
      >
        <Icon
          name={item.icon || "Circle"}
          className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
        />
      </span>

      {/* Label */}
      <span
        className={cn(
          "flex-1 truncate text-left text-sm font-medium",
          "transition-colors duration-200",
          isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/80"
        )}
      >
        {t.navBar(`labels.${item.path}`)}
      </span>
    </button>
  );
}

/**
 * NavGroup - Group with popover submenu
 */
function NavGroup({
  groupKey,
  items,
  isItemActive,
  router,
  t,
}: {
  groupKey: string;
  items: FeatureWithActions[];
  isItemActive: (item: FeatureWithActions) => boolean;
  router: ReturnType<typeof useRouter>;
  t: ReturnType<typeof useLang>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveItem = items.some((item) => isItemActive(item));

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "group relative flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5",
            "transition-all duration-200 ease-out",
            "hover:bg-sidebar-accent/60",
            (hasActiveItem || isOpen) && ["bg-sidebar-accent/50"]
          )}
        >
          {/* Active indicator bar */}
          <span
            className={cn(
              "absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full",
              "bg-primary/60 transition-all duration-300",
              hasActiveItem ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            )}
          />

          {/* Icon */}
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
              "transition-all duration-200",
              hasActiveItem
                ? "bg-primary/10 text-primary"
                : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
            )}
          >
            <lucideIcons.LayersIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </span>

          {/* Label */}
          <span
            className={cn(
              "flex-1 truncate text-left text-sm font-medium",
              "transition-colors duration-200",
              hasActiveItem ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/80"
            )}
          >
            {t.navBar(`groups.${groupKey}`)}
          </span>

          {/* Arrow */}
          <lucideIcons.ChevronRightIcon
            className={cn(
              "text-sidebar-foreground/50 h-4 w-4 transition-all duration-200",
              "group-hover:text-sidebar-foreground/80 group-hover:translate-x-0.5",
              isOpen && "rotate-90"
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="start"
        sideOffset={8}
        className={cn(
          "w-56 p-2",
          "bg-popover/95 backdrop-blur-md",
          "border-border/50 border",
          "shadow-xl"
        )}
      >
        <div className="space-y-1">
          <p className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
            {t.navBar(`groups.${groupKey}`)}
          </p>
          {items.map((subItem) => {
            const active = isItemActive(subItem);
            return (
              <button
                key={subItem.path}
                onClick={() => {
                  router.push(`/${subItem.route || subItem.path}`);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-2",
                  "transition-all duration-150",
                  "hover:bg-accent",
                  active && "bg-accent text-accent-foreground"
                )}
              >
                <Icon
                  name={subItem.icon || "Circle"}
                  className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")}
                />
                <span className="text-sm font-medium">{t.navBar(`labels.${subItem.path}`)}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * AppSidebar - Modern floating sidebar with glassmorphism
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useLang();
  const { state } = useSidebar();

  const { access, module } = useAccess();
  const store = useAppSelector((state) => state);

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

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "*:data-[sidebar=sidebar]:bg-sidebar/90 *:data-[sidebar=sidebar]:backdrop-blur-xl",
        "*:data-[sidebar=sidebar]:border-r-0",
        "*:data-[sidebar=sidebar]:shadow-xl"
      )}
      {...props}
    >
      {/* Header - Company & Module Switcher */}
      <SidebarHeader className="border-sidebar-border/50 border-b pb-3">
        <ModuleSwitcher />
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-2 py-4">
        <nav className="space-y-0.5">
          {Object.keys(groupedSidebarItems).map((groupKey) => {
            const items = groupedSidebarItems[groupKey];

            // Group with multiple items - use popover
            if (groupKey !== "__UNGROUPED__" && items.length > 1) {
              if (isCollapsed) {
                // Collapsed: show tooltip with icon only
                return (
                  <Tooltip key={groupKey}>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          "mx-auto flex h-10 w-10 items-center justify-center rounded-xl",
                          "transition-all duration-200",
                          "hover:bg-sidebar-accent/60",
                          items.some(isItemActive) && "bg-sidebar-accent"
                        )}
                      >
                        <lucideIcons.LayersIcon className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex flex-col gap-1">
                      <p className="font-semibold">{t.navBar(`groups.${groupKey}`)}</p>
                      {items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => router.push(`/${item.route || item.path}`)}
                          className="hover:text-primary text-left text-sm"
                        >
                          {t.navBar(`labels.${item.path}`)}
                        </button>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <NavGroup
                  key={groupKey}
                  groupKey={groupKey}
                  items={items}
                  isItemActive={isItemActive}
                  router={router}
                  t={t}
                />
              );
            }

            // Single items or ungrouped
            return items.map((item: FeatureWithActions) => {
              const active = isItemActive(item);

              if (isCollapsed) {
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => router.push(`/${item.route || item.path}`)}
                        className={cn(
                          "mx-auto flex h-10 w-10 items-center justify-center rounded-xl",
                          "transition-all duration-200",
                          "hover:bg-sidebar-accent/60",
                          active && "bg-sidebar-accent text-primary"
                        )}
                      >
                        <Icon name={item.icon || "Circle"} className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{t.navBar(`labels.${item.path}`)}</TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={active}
                  onClick={() => router.push(`/${item.route || item.path}`)}
                  t={t}
                />
              );
            });
          })}
        </nav>
      </SidebarContent>

      {/* Footer - Action Bar */}
      <SidebarFooter
        className={cn(
          "border-sidebar-border/50 border-t pt-3",
          "flex items-center justify-end gap-2"
        )}
      >
        {/* Quick Actions */}
        <div className={cn("flex w-full justify-end gap-1", isCollapsed && "flex-col")}>
          <AppLanguage />
          <AppTheme />
        </div>

        {/* User */}
        <div className={"p-2"}>
          <NavUser variant={isCollapsed ? "small" : "large"} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
