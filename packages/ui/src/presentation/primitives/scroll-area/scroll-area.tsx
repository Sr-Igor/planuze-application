/**
 * ScrollArea Component Module
 *
 * Augments native scroll functionality for custom, cross-browser styling.
 *
 * @module presentation/primitives/scroll-area
 */

"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * ScrollArea component props.
 */
export type ScrollAreaProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>;

/**
 * ScrollArea component.
 *
 * A scrollable area with custom scrollbars.
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-[200px]">
 *   <div>Long content here...</div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    data-slot="scroll-area"
    className={cn("relative", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={cn(
        "size-full rounded-[inherit] transition-[color,box-shadow]",
        "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50",
        "focus-visible:ring-4 focus-visible:outline-1"
      )}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));

ScrollArea.displayName = "ScrollArea";

/**
 * ScrollBar component props.
 */
export type ScrollBarProps = ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;

/**
 * ScrollBar component.
 *
 * The scrollbar track and thumb.
 */
const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    className={cn(
      "flex touch-none p-px transition-colors select-none",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot="scroll-area-thumb"
      className="bg-border relative flex-1 rounded-full"
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
