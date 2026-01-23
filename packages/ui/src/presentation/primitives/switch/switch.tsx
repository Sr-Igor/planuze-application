/**
 * Switch Component Module
 *
 * A control that allows the user to toggle between checked and not checked.
 *
 * @module presentation/primitives/switch
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "../../../shared/utils";

/**
 * Switch Component Module
 *
 * A control that allows the user to toggle between checked and not checked.
 *
 * @module presentation/primitives/switch
 */

/**
 * Switch component props.
 */
export type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

/**
 * Switch component.
 *
 * A toggle switch for binary options.
 *
 * @example
 * ```tsx
 * <Switch />
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * ```
 */
const Switch = forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-5 w-9 shrink-0 items-center rounded-full",
        "border-2 border-transparent shadow-sm transition-all duration-200 ease-out outline-none",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        "data-[state=checked]:shadow-md",
        "hover:data-[state=unchecked]:bg-input/80",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background pointer-events-none absolute block size-4 rounded-full",
          "shadow-md ring-0 transition-all duration-200 ease-out",
          "data-[state=checked]:right-0.5 data-[state=unchecked]:left-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  )
);

Switch.displayName = "Switch";

export { Switch };
