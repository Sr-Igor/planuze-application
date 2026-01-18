/**
 * Drawer Component Module
 *
 * A drawer component that slides in from the edge of the screen.
 * Uses vaul library for smooth animations.
 *
 * @module presentation/primitives/drawer
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../../../shared/utils";

// ============================================================================
// Root Components
// ============================================================================

export type DrawerProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>;

function Drawer({ ...props }: DrawerProps) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

export type DrawerTriggerProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>;

const DrawerTrigger = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Trigger>,
  DrawerTriggerProps
>(({ ...props }, ref) => (
  <DrawerPrimitive.Trigger ref={ref} data-slot="drawer-trigger" {...props} />
));

DrawerTrigger.displayName = "DrawerTrigger";

export type DrawerPortalProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>;

function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

export type DrawerCloseProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>;

const DrawerClose = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Close>,
  DrawerCloseProps
>(({ ...props }, ref) => (
  <DrawerPrimitive.Close ref={ref} data-slot="drawer-close" {...props} />
));

DrawerClose.displayName = "DrawerClose";

// ============================================================================
// Overlay & Content
// ============================================================================

export type DrawerOverlayProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;

const DrawerOverlay = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    data-slot="drawer-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));

DrawerOverlay.displayName = "DrawerOverlay";

export type DrawerContentProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;

const DrawerContent = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      data-slot="drawer-content"
      className={cn(
        "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
        // Top direction
        "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0",
        "data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh]",
        "data-[vaul-drawer-direction=top]:rounded-b-lg",
        // Bottom direction
        "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0",
        "data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh]",
        "data-[vaul-drawer-direction=bottom]:rounded-t-lg",
        // Right direction
        "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0",
        "data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm",
        // Left direction
        "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0",
        "data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm",
        className
      )}
      {...props}
    >
      <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));

DrawerContent.displayName = "DrawerContent";

// ============================================================================
// Header & Footer
// ============================================================================

export type DrawerHeaderProps = ComponentPropsWithoutRef<"div">;

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
);

DrawerHeader.displayName = "DrawerHeader";

export type DrawerFooterProps = ComponentPropsWithoutRef<"div">;

const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
);

DrawerFooter.displayName = "DrawerFooter";

// ============================================================================
// Title & Description
// ============================================================================

export type DrawerTitleProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>;

const DrawerTitle = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn("text-foreground font-semibold", className)}
    {...props}
  />
));

DrawerTitle.displayName = "DrawerTitle";

export type DrawerDescriptionProps = ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Description
>;

const DrawerDescription = forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    data-slot="drawer-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));

DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
