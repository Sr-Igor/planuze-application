/**
 * NavigationMenu Component Module
 *
 * A collection of links for navigating websites.
 *
 * @module presentation/primitives/navigation-menu
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "../../../shared/utils";
import { navigationMenuTriggerStyle } from "./navigation-menu.variants";

/**
 * NavigationMenu Component Module
 *
 * A collection of links for navigating websites.
 *
 * @module presentation/primitives/navigation-menu
 */

/**
 * NavigationMenu Component Module
 *
 * A collection of links for navigating websites.
 *
 * @module presentation/primitives/navigation-menu
 */

// ============================================================================
// Root Components
// ============================================================================

export type NavigationMenuProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
};

const NavigationMenu = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, children, viewport = true, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    data-slot="navigation-menu"
    data-viewport={viewport}
    className={cn(
      "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    {viewport && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
));

NavigationMenu.displayName = "NavigationMenu";

export type NavigationMenuListProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>;

const NavigationMenuList = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    data-slot="navigation-menu-list"
    className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
    {...props}
  />
));

NavigationMenuList.displayName = "NavigationMenuList";

export type NavigationMenuItemProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>;

const NavigationMenuItem = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  NavigationMenuItemProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Item
    ref={ref}
    data-slot="navigation-menu-item"
    className={cn("relative", className)}
    {...props}
  />
));

NavigationMenuItem.displayName = "NavigationMenuItem";

// ============================================================================
// Trigger & Content
// ============================================================================

export type NavigationMenuTriggerProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Trigger
>;

const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    data-slot="navigation-menu-trigger"
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDownIcon
      className="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export type NavigationMenuContentProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Content
>;

const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    data-slot="navigation-menu-content"
    className={cn(
      "top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
      "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
      "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
      "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
      "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
      // Non-viewport styles
      "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground",
      "group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out",
      "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
      "group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0",
      "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5",
      "group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md",
      "group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200",
      "**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
      className
    )}
    {...props}
  />
));

NavigationMenuContent.displayName = "NavigationMenuContent";

// ============================================================================
// Viewport & Indicator
// ============================================================================

export type NavigationMenuViewportProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Viewport
>;

const NavigationMenuViewport = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
  <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-slot="navigation-menu-viewport"
      className={cn(
        "origin-top-center bg-popover/95 text-popover-foreground relative mt-1.5 overflow-hidden rounded-md border shadow-lg backdrop-blur-sm",
        "h-(--radix-navigation-menu-viewport-height) w-full md:w-(--radix-navigation-menu-viewport-width)",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
        className
      )}
      {...props}
    />
  </div>
));

NavigationMenuViewport.displayName = "NavigationMenuViewport";

export type NavigationMenuLinkProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>;

const NavigationMenuLink = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    data-slot="navigation-menu-link"
    className={cn(
      "flex flex-col gap-1 rounded-sm p-2 text-sm",
      "hover:bg-accent hover:text-accent-foreground",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground",
      "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50",
      "[&_svg:not([class*='text-'])]:text-muted-foreground",
      "transition-all duration-200 focus-visible:ring-4 focus-visible:outline-1",
      "[&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  />
));

NavigationMenuLink.displayName = "NavigationMenuLink";

export type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Indicator
>;

const NavigationMenuIndicator = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    data-slot="navigation-menu-indicator"
    className={cn(
      "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
      "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
      "data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));

NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
};

export { navigationMenuTriggerStyle } from "./navigation-menu.variants";
