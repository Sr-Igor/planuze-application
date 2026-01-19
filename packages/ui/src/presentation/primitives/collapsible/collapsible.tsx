/**
 * Collapsible Component Module
 *
 * An interactive component which expands/collapses a panel.
 *
 * @module presentation/primitives/collapsible
 */

"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ComponentPropsWithoutRef, forwardRef } from "react";

/**
 * Collapsible component props.
 */
export type CollapsibleProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;

/**
 * Collapsible component.
 *
 * A component that can be expanded or collapsed.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Hidden content</CollapsibleContent>
 * </Collapsible>
 * ```
 */
const Collapsible = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ ...props }, ref) => (
  <CollapsiblePrimitive.Root ref={ref} data-slot="collapsible" {...props} />
));

Collapsible.displayName = "Collapsible";

/**
 * CollapsibleTrigger component props.
 */
export type CollapsibleTriggerProps = ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;

/**
 * CollapsibleTrigger component.
 *
 * The button that toggles the collapsible.
 */
const CollapsibleTrigger = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  CollapsibleTriggerProps
>(({ ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    data-slot="collapsible-trigger"
    {...props}
  />
));

CollapsibleTrigger.displayName = "CollapsibleTrigger";

/**
 * CollapsibleContent component props.
 */
export type CollapsibleContentProps = ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.CollapsibleContent
>;

/**
 * CollapsibleContent component.
 *
 * The content that is shown/hidden.
 */
const CollapsibleContent = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  CollapsibleContentProps
>(({ ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    data-slot="collapsible-content"
    {...props}
  />
));

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
