/**
 * Toggle Component Module
 *
 * A two-state button that can be either on or off.
 *
 * @module presentation/primitives/toggle
 */

"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";
import { toggleVariants, ToggleVariantProps } from "./toggle.variants";

/**
 * Toggle component props.
 */
export type ToggleProps = ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  ToggleVariantProps;

/**
 * Toggle component.
 *
 * A button that can be toggled on or off.
 *
 * @example
 * ```tsx
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon />
 * </Toggle>
 *
 * <Toggle variant="outline" pressed={isPressed} onPressedChange={setIsPressed}>
 *   Toggle
 * </Toggle>
 * ```
 */
const Toggle = forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
