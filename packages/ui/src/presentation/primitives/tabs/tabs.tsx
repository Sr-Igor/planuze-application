/**
 * Tabs Component Module
 *
 * A set of layered sections of content displayed one at a time.
 *
 * @module presentation/primitives/tabs
 */

"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * Tabs component props.
 */
export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

/**
 * Tabs component.
 *
 * Container for tab navigation.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
);

Tabs.displayName = "Tabs";

/**
 * TabsList component props.
 */
export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

/**
 * TabsList component.
 *
 * Container for tab triggers.
 */
const TabsList = forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1",
        className
      )}
      {...props}
    />
  )
);

TabsList.displayName = "TabsList";

/**
 * TabsTrigger component props.
 */
export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

/**
 * TabsTrigger component.
 *
 * A button that activates its associated tab content.
 */
const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap",
      "transition-[color,box-shadow]",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring",
      "focus-visible:ring-[3px] focus-visible:outline-1",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = "TabsTrigger";

/**
 * TabsContent component props.
 */
export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

/**
 * TabsContent component.
 *
 * The content displayed when a tab is active.
 */
const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("flex-1 outline-none", className)}
    {...props}
  />
));

TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, TabsList, TabsTrigger };
