/**
 * HoverCard Component Module
 *
 * Displays content when hovering over a trigger element.
 *
 * @module presentation/primitives/hover-card
 */

"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

export type HoverCardProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;

function HoverCard({ ...props }: Readonly<HoverCardProps>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

export type HoverCardTriggerProps = ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Trigger
>;

const HoverCardTrigger = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  HoverCardTriggerProps
>(({ ...props }, ref) => (
  <HoverCardPrimitive.Trigger ref={ref} data-slot="hover-card-trigger" {...props} />
));

HoverCardTrigger.displayName = "HoverCardTrigger";

export type HoverCardContentProps = ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
>;

const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    data-slot="hover-card-content"
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "bg-popover text-popover-foreground z-50 w-64 rounded-md border p-4 shadow-md outline-hidden",
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

HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardContent, HoverCardTrigger };
