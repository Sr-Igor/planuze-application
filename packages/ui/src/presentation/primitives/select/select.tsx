/**
 * Select Component Module
 *
 * Displays a list of options for the user to pick from.
 *
 * @module presentation/primitives/select
 */

"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

// ============================================================================
// Root Components
// ============================================================================

export type SelectProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

function Select({ ...props }: SelectProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export type SelectGroupProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;

function SelectGroup({ ...props }: Readonly<SelectGroupProps>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export type SelectValueProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

function SelectValue({ ...props }: Readonly<SelectValueProps>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

// ============================================================================
// Trigger
// ============================================================================

export type SelectTriggerProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;

const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, disabled, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    disabled={disabled}
    className={cn(
      "border-input flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs",
      "transition-[color,box-shadow] outline-none",
      "data-placeholder:text-muted-foreground",
      "[&_svg:not([class*='text-'])]:text-muted-foreground",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      "[&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    {!disabled && (
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
));

SelectTrigger.displayName = "SelectTrigger";

// ============================================================================
// Content
// ============================================================================

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={cn(
        "bg-popover text-popover-foreground relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = "SelectContent";

// ============================================================================
// Items
// ============================================================================

export type SelectLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn("px-2 py-1.5 text-sm font-medium", className)}
    {...props}
  />
));

SelectLabel.displayName = "SelectLabel";

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
      "focus:bg-accent focus:text-accent-foreground",
      "[&_svg:not([class*='text-'])]:text-muted-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

SelectItem.displayName = "SelectItem";

export type SelectSeparatorProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Separator
>;

const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
    {...props}
  />
));

SelectSeparator.displayName = "SelectSeparator";

// ============================================================================
// Scroll Buttons
// ============================================================================

export type SelectScrollUpButtonProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollUpButton
>;

const SelectScrollUpButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    data-slot="select-scroll-up-button"
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpButton>
));

SelectScrollUpButton.displayName = "SelectScrollUpButton";

export type SelectScrollDownButtonProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollDownButton
>;

const SelectScrollDownButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    data-slot="select-scroll-down-button"
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownButton>
));

SelectScrollDownButton.displayName = "SelectScrollDownButton";

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
