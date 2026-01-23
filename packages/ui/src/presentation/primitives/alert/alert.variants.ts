/**
 * Alert Variants Module
 *
 * Defines all visual variants for the Alert component using CVA.
 *
 * @module presentation/primitives/alert/variants
 */
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Alert variant configuration.
 */
export const alertVariants = cva(
  [
    "relative w-full rounded-lg border px-4 py-3 text-sm shadow-sm",
    "grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr]",
    "has-[>svg]:gap-x-3 gap-y-0.5 items-start",
    "[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  ],
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/30 bg-destructive/5 text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Type for alert variant props.
 */
export type AlertVariantProps = VariantProps<typeof alertVariants>;
