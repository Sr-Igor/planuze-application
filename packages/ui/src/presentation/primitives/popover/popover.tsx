/**
 * Popover Component Module
 *
 * A popup that displays rich content in a portal.
 *
 * @module presentation/primitives/popover
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "../../../shared/utils";

/**
 * Popover Component Module
 *
 * A popup that displays rich content in a portal.
 *
 * @module presentation/primitives/popover
 */

/**
 * Popover component props.
 */
export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

/**
 * Popover component.
 *
 * Container for popover content.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Popover content</PopoverContent>
 * </Popover>
 * ```
 */
function Popover({ ...props }: Readonly<PopoverProps>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/**
 * PopoverTrigger component props.
 */
export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

/**
 * PopoverTrigger component.
 *
 * The element that triggers the popover.
 */
const PopoverTrigger = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(({ ...props }, ref) => (
  <PopoverPrimitive.Trigger ref={ref} data-slot="popover-trigger" {...props} />
));

PopoverTrigger.displayName = "PopoverTrigger";

/**
 * PopoverAnchor component props.
 */
export type PopoverAnchorProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>;

/**
 * PopoverAnchor component.
 *
 * An optional anchor element for the popover.
 */
const PopoverAnchor = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Anchor>,
  PopoverAnchorProps
>(({ ...props }, ref) => (
  <PopoverPrimitive.Anchor ref={ref} data-slot="popover-anchor" {...props} />
));

PopoverAnchor.displayName = "PopoverAnchor";

/**
 * PopoverContent component props.
 */
export type PopoverContentProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

/**
 * PopoverContent component.
 *
 * The content displayed in the popover.
 */
const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "bg-popover/95 text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-lg outline-hidden backdrop-blur-sm",
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
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = "PopoverContent";

/**
 * PopoverContentInModal component.
 *
 * A variant of PopoverContent that works inside modals.
 */
const PopoverContentInModal = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      onWheel={(e) => {
        e.stopPropagation();
      }}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

PopoverContentInModal.displayName = "PopoverContentInModal";

export { Popover, PopoverAnchor, PopoverContent, PopoverContentInModal, PopoverTrigger };
