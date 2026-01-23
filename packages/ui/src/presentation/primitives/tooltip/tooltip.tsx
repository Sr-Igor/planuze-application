/**
 * Tooltip Component Module
 *
 * A popup that displays information related to an element.
 *
 * @module presentation/primitives/tooltip
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../../shared/utils";

/**
 * Tooltip Component Module
 *
 * A popup that displays information related to an element.
 *
 * @module presentation/primitives/tooltip
 */

/**
 * TooltipProvider component props.
 */
export type TooltipProviderProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;

/**
 * TooltipProvider component.
 *
 * Wraps the application to provide tooltip functionality.
 */
function TooltipProvider({ delayDuration = 0, ...props }: Readonly<TooltipProviderProps>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Tooltip component props.
 */
export type TooltipProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

/**
 * Tooltip component.
 *
 * Displays a tooltip when hovering over an element.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip content</TooltipContent>
 * </Tooltip>
 * ```
 */
function Tooltip({ ...props }: Readonly<TooltipProps>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * TooltipTrigger component props.
 */
export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;

/**
 * TooltipTrigger component.
 *
 * The element that triggers the tooltip.
 */
const TooltipTrigger = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(({ ...props }, ref) => (
  <TooltipPrimitive.Trigger ref={ref} data-slot="tooltip-trigger" {...props} />
));

TooltipTrigger.displayName = "TooltipTrigger";

/**
 * TooltipContent component props.
 */
export type TooltipContentProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;

/**
 * TooltipContent component.
 *
 * The content displayed in the tooltip.
 */
const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "bg-primary text-primary-foreground z-50 max-w-sm rounded-md px-3 py-1.5 text-xs shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
