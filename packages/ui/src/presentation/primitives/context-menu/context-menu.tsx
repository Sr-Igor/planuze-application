/**
 * ContextMenu Component Module
 *
 * Displays a menu to the user triggered by a right-click.
 *
 * @module presentation/primitives/context-menu
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "../../../shared/utils";

/**
 * ContextMenu Component Module
 *
 * Displays a menu to the user triggered by a right-click.
 *
 * @module presentation/primitives/context-menu
 */

// ============================================================================
// Root Components
// ============================================================================

export type ContextMenuProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>;

function ContextMenu({ ...props }: Readonly<ContextMenuProps>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

export type ContextMenuTriggerProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>;

const ContextMenuTrigger = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Trigger>,
  ContextMenuTriggerProps
>(({ ...props }, ref) => (
  <ContextMenuPrimitive.Trigger ref={ref} data-slot="context-menu-trigger" {...props} />
));

ContextMenuTrigger.displayName = "ContextMenuTrigger";

export type ContextMenuGroupProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>;

const ContextMenuGroup = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Group>,
  ContextMenuGroupProps
>(({ ...props }, ref) => (
  <ContextMenuPrimitive.Group ref={ref} data-slot="context-menu-group" {...props} />
));

ContextMenuGroup.displayName = "ContextMenuGroup";

export type ContextMenuPortalProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal>;

function ContextMenuPortal({ ...props }: Readonly<ContextMenuPortalProps>) {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />;
}

export type ContextMenuSubProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub>;

function ContextMenuSub({ ...props }: Readonly<ContextMenuSubProps>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

export type ContextMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioGroup
>;

const ContextMenuRadioGroup = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioGroup>,
  ContextMenuRadioGroupProps
>(({ ...props }, ref) => (
  <ContextMenuPrimitive.RadioGroup ref={ref} data-slot="context-menu-radio-group" {...props} />
));

ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

// ============================================================================
// Trigger & Content
// ============================================================================

export type ContextMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};

const ContextMenuSubTrigger = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  ContextMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="context-menu-sub-trigger"
    data-inset={inset}
    className={cn(
      "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      "data-inset:pl-8",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto" />
  </ContextMenuPrimitive.SubTrigger>
));

ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

export type ContextMenuSubContentProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubContent
>;

const ContextMenuSubContent = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  ContextMenuSubContentProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    data-slot="context-menu-sub-content"
    className={cn(
      "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));

ContextMenuSubContent.displayName = "ContextMenuSubContent";

export type ContextMenuContentProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>;

const ContextMenuContent = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      data-slot="context-menu-content"
      className={cn(
        "bg-popover/95 text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));

ContextMenuContent.displayName = "ContextMenuContent";

// ============================================================================
// Items
// ============================================================================

export type ContextMenuItemProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
};

const ContextMenuItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(({ className, inset, variant = "default", ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    data-slot="context-menu-item"
    data-inset={inset}
    data-variant={variant}
    className={cn(
      "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "data-inset:pl-8",
      "data-[variant=destructive]:text-destructive-foreground",
      "data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40",
      "data-[variant=destructive]:focus:text-destructive-foreground",
      "data-[variant=destructive]:*:[svg]:text-destructive-foreground!",
      "[&_svg:not([class*='text-'])]:text-muted-foreground",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  />
));

ContextMenuItem.displayName = "ContextMenuItem";

export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.CheckboxItem
>;

const ContextMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="context-menu-checkbox-item"
    className={cn(
      "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioItem
>;

const ContextMenuRadioItem = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  ContextMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    data-slot="context-menu-radio-item"
    className={cn(
      "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <CircleIcon className="size-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));

ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

// ============================================================================
// Label, Separator & Shortcut
// ============================================================================

export type ContextMenuLabelProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
};

const ContextMenuLabel = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  ContextMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    data-slot="context-menu-label"
    data-inset={inset}
    className={cn("text-foreground px-2 py-1.5 text-sm font-medium data-inset:pl-8", className)}
    {...props}
  />
));

ContextMenuLabel.displayName = "ContextMenuLabel";

export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Separator
>;

const ContextMenuSeparator = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    data-slot="context-menu-separator"
    className={cn("bg-border -mx-1 my-1 h-px", className)}
    {...props}
  />
));

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export type ContextMenuShortcutProps = ComponentPropsWithoutRef<"span">;

const ContextMenuShortcut = forwardRef<HTMLSpanElement, ContextMenuShortcutProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="context-menu-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  )
);

ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
