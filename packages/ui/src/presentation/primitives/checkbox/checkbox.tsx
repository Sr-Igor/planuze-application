/**
 * Checkbox Component Module
 *
 * A control that allows the user to toggle between checked and not checked.
 *
 * @module presentation/primitives/checkbox
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "../../../shared/utils";

/**
 * Checkbox Component Module
 *
 * A control that allows the user to toggle between checked and not checked.
 *
 * @module presentation/primitives/checkbox
 */

/**
 * Checkbox component props.
 */
export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  /**
   * Custom class name for the check icon.
   */
  iconClassName?: string;
};

/**
 * Checkbox component.
 *
 * A checkbox input for boolean selections.
 *
 * @example
 * ```tsx
 * <Checkbox />
 * <Checkbox checked={accepted} onCheckedChange={setAccepted} />
 * ```
 */
const Checkbox = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, iconClassName, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border shadow-sm transition-all duration-200 outline-none",
        "border-input bg-background",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
        "data-[state=checked]:shadow-md",
        "hover:border-primary/50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-all duration-150"
      >
        <CheckIcon className={cn("size-3.5 stroke-[2.5]", iconClassName)} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
