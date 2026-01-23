/**
 * Badge Variants Module
 *
 * Defines all visual variants for the Badge component using CVA.
 *
 * @module presentation/primitives/badge/variants
 */
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Badge variant configuration.
 */
export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md border",
    "px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0",
    "[&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "transition-all duration-200 overflow-auto shadow-sm",
  ],
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white shadow-sm [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground shadow-none [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Type for badge variant props.
 */
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
