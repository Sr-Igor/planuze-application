/**
 * Badge Component Module
 *
 * A small status descriptor for UI elements.
 *
 * @module presentation/primitives/badge
 */

import { forwardRef } from "react";

import { Slot } from "../../../infrastructure/adapters";
import { cn } from "../../../shared/utils";
import type { BadgeProps } from "./badge.types";
import { badgeVariants } from "./badge.variants";

/**
 * Badge component.
 *
 * Displays a small badge with different visual variants.
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Outline</Badge>
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export { badgeVariants } from "./badge.variants";
export type { BadgeProps } from "./badge.types";
