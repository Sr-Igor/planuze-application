/**
 * Label Component Module
 *
 * An accessible label for form controls.
 *
 * @module presentation/primitives/label
 */

"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * Label component props.
 */
export type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

/**
 * Label component.
 *
 * Renders an accessible label associated with form controls.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 * ```
 */
const Label = forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn(
        "text-sm leading-none font-medium select-none",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);

Label.displayName = "Label";

export { Label };
