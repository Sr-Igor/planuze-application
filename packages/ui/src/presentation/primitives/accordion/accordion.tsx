/**
 * Accordion Component Module
 *
 * A vertically stacked set of interactive headings that reveal content.
 *
 * @module presentation/primitives/accordion
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "../../../shared/utils";

/**
 * Accordion Component Module
 *
 * A vertically stacked set of interactive headings that reveal content.
 *
 * @module presentation/primitives/accordion
 */

/**
 * Accordion component props.
 */
export type AccordionProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

/**
 * Accordion component.
 *
 * Container for accordion items.
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>Yes. It adheres to WAI-ARIA patterns.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion = forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  ({ ...props }, ref) => <AccordionPrimitive.Root ref={ref} data-slot="accordion" {...props} />
);

Accordion.displayName = "Accordion";

/**
 * AccordionItem component props.
 */
export type AccordionItemProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>;

/**
 * AccordionItem component.
 *
 * An individual accordion section.
 */
const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-b last:border-b-0", className)}
    {...props}
  />
));

AccordionItem.displayName = "AccordionItem";

/**
 * AccordionTrigger component props.
 */
export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>;

/**
 * AccordionTrigger component.
 *
 * The clickable header that toggles the accordion content.
 */
const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium",
        "hover:text-primary transition-all duration-200 outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-300 ease-out" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

/**
 * AccordionContent component props.
 */
export type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>;

/**
 * AccordionContent component.
 *
 * The collapsible content area of the accordion.
 */
const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
