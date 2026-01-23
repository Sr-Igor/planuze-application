/**
 * Sheet Component Module
 *
 * A slide-out panel that appears from the edge of the screen.
 *
 * @module presentation/primitives/sheet
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "../../../shared/utils";

/**
 * Sheet Component Module
 *
 * A slide-out panel that appears from the edge of the screen.
 *
 * @module presentation/primitives/sheet
 */

// ============================================================================
// Root Components
// ============================================================================

export type SheetProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;

function Sheet({ ...props }: Readonly<SheetProps>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

export type SheetTriggerProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>;

const SheetTrigger = forwardRef<React.ElementRef<typeof SheetPrimitive.Trigger>, SheetTriggerProps>(
  ({ ...props }, ref) => <SheetPrimitive.Trigger ref={ref} data-slot="sheet-trigger" {...props} />
);

SheetTrigger.displayName = "SheetTrigger";

export type SheetCloseProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Close>;

const SheetClose = forwardRef<React.ElementRef<typeof SheetPrimitive.Close>, SheetCloseProps>(
  ({ ...props }, ref) => <SheetPrimitive.Close ref={ref} data-slot="sheet-close" {...props} />
);

SheetClose.displayName = "SheetClose";

export type SheetPortalProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Portal>;

function SheetPortal({ ...props }: Readonly<SheetPortalProps>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

// ============================================================================
// Overlay & Content
// ============================================================================

export type SheetOverlayProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>;

const SheetOverlay = forwardRef<React.ElementRef<typeof SheetPrimitive.Overlay>, SheetOverlayProps>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/80",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
);

SheetOverlay.displayName = "SheetOverlay";

export type SheetSide = "top" | "right" | "bottom" | "left";

export type SheetContentProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
  side?: SheetSide;
};

const SheetContent = forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ className, children, side = "right", ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        className={cn(
          "bg-background/95 fixed z-50 flex flex-col gap-4 shadow-xl backdrop-blur-sm transition ease-in-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className={cn(
            "ring-offset-background absolute top-4 right-4 rounded-sm opacity-70",
            "hover:bg-muted transition-all duration-150 hover:opacity-100",
            "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-hidden",
            "disabled:pointer-events-none",
            "p-1"
          )}
        >
          <XIcon className="size-4 stroke-2" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);

SheetContent.displayName = "SheetContent";

// ============================================================================
// Header & Footer
// ============================================================================

export type SheetHeaderProps = ComponentPropsWithoutRef<"div">;

const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sheet-header"
    className={cn("flex flex-col gap-1.5 p-4", className)}
    {...props}
  />
));

SheetHeader.displayName = "SheetHeader";

export type SheetFooterProps = ComponentPropsWithoutRef<"div">;

const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sheet-footer"
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
));

SheetFooter.displayName = "SheetFooter";

// ============================================================================
// Title & Description
// ============================================================================

export type SheetTitleProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Title>;

const SheetTitle = forwardRef<React.ElementRef<typeof SheetPrimitive.Title>, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Title
      ref={ref}
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
);

SheetTitle.displayName = "SheetTitle";

export type SheetDescriptionProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Description>;

const SheetDescription = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));

SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
