/**
 * AlertDialog Component Module
 *
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * @module presentation/primitives/alert-dialog
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "../../../shared/utils";
import { buttonVariants } from "../button";

/**
 * AlertDialog Component Module
 *
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * @module presentation/primitives/alert-dialog
 */

// ============================================================================
// Root Components
// ============================================================================

export type AlertDialogProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>;

function AlertDialog({ ...props }: Readonly<AlertDialogProps>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export type AlertDialogTriggerProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>;

const AlertDialogTrigger = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
  AlertDialogTriggerProps
>(({ ...props }, ref) => (
  <AlertDialogPrimitive.Trigger ref={ref} data-slot="alert-dialog-trigger" {...props} />
));

AlertDialogTrigger.displayName = "AlertDialogTrigger";

export type AlertDialogPortalProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Portal>;

function AlertDialogPortal({ ...props }: Readonly<AlertDialogPortalProps>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

// ============================================================================
// Overlay & Content
// ============================================================================

export type AlertDialogOverlayProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>;

const AlertDialogOverlay = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    data-slot="alert-dialog-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));

AlertDialogOverlay.displayName = "AlertDialogOverlay";

export type AlertDialogContentProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>;

const AlertDialogContent = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      data-slot="alert-dialog-content"
      className={cn(
        "bg-background/95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] backdrop-blur-sm",
        "gap-4 rounded-lg border p-6 shadow-xl duration-200 sm:max-w-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));

AlertDialogContent.displayName = "AlertDialogContent";

// ============================================================================
// Header & Footer
// ============================================================================

export type AlertDialogHeaderProps = ComponentPropsWithoutRef<"div">;

const AlertDialogHeader = forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
);

AlertDialogHeader.displayName = "AlertDialogHeader";

export type AlertDialogFooterProps = ComponentPropsWithoutRef<"div">;

const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
);

AlertDialogFooter.displayName = "AlertDialogFooter";

// ============================================================================
// Title & Description
// ============================================================================

export type AlertDialogTitleProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>;

const AlertDialogTitle = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    data-slot="alert-dialog-title"
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));

AlertDialogTitle.displayName = "AlertDialogTitle";

export type AlertDialogDescriptionProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Description
>;

const AlertDialogDescription = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    data-slot="alert-dialog-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));

AlertDialogDescription.displayName = "AlertDialogDescription";

// ============================================================================
// Action & Cancel
// ============================================================================

export type AlertDialogActionProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>;

const AlertDialogAction = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));

AlertDialogAction.displayName = "AlertDialogAction";

export type AlertDialogCancelProps = ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>;

const AlertDialogCancel = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), className)}
    {...props}
  />
));

AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
