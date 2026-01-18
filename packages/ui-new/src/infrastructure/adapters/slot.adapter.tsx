/**
 * Slot Adapter Module
 *
 * Provides an abstraction layer over the Radix UI Slot component.
 * This follows the Dependency Inversion Principle (DIP) - high-level
 * modules should not depend on low-level modules; both should depend
 * on abstractions.
 *
 * By wrapping Radix Slot, we:
 * 1. Decouple our components from the specific slot implementation
 * 2. Can easily swap implementations if needed
 * 3. Provide a consistent API across the library
 *
 * @module infrastructure/adapters/slot
 */

import { Slot as RadixSlot, Slottable as RadixSlottable } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from "react";

/**
 * Props for the Slot adapter component.
 */
export interface SlotProps extends ComponentPropsWithoutRef<typeof RadixSlot> {
  children?: ReactNode;
}

/**
 * Slot component adapter.
 *
 * Merges its props with its immediate child element's props.
 * This enables the "asChild" pattern for polymorphic components.
 *
 * @example
 * ```tsx
 * // The Slot will merge props with the anchor element
 * <Slot className="button-styles" onClick={handleClick}>
 *   <a href="/page">Click me</a>
 * </Slot>
 * // Result: <a href="/page" className="button-styles" onClick={handleClick}>Click me</a>
 * ```
 */
export const Slot = forwardRef<ElementRef<typeof RadixSlot>, SlotProps>(
  (props, ref) => {
    return <RadixSlot ref={ref} {...props} />;
  }
);

Slot.displayName = "Slot";

/**
 * Props for the Slottable adapter component.
 */
export interface SlottableProps {
  children?: ReactNode;
}

/**
 * Slottable component adapter.
 *
 * Wraps content that should be "slottable" - meaning it can be
 * replaced by a child element when used with the Slot component.
 *
 * @example
 * ```tsx
 * // In a Button component
 * const Comp = asChild ? Slot : "button";
 * return (
 *   <Comp>
 *     <Slottable>{children}</Slottable>
 *     <Icon />
 *   </Comp>
 * );
 * ```
 */
export const Slottable = ({ children }: SlottableProps) => {
  return <RadixSlottable>{children}</RadixSlottable>;
};

Slottable.displayName = "Slottable";

/**
 * Type guard to check if a component should use slot behavior.
 *
 * @param asChild - The asChild prop value
 * @returns True if slot behavior should be used
 */
export function shouldUseSlot(asChild: boolean | undefined): asChild is true {
  return asChild === true;
}
