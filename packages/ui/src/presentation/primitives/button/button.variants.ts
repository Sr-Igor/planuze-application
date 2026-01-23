/**
 * Button Variants Module
 *
 * Defines all visual variants for the Button component using CVA.
 * Following Open/Closed Principle (OCP), new variants can be added
 * without modifying the component itself.
 *
 * @module presentation/primitives/button/variants
 */
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button variant configuration using class-variance-authority.
 *
 * This defines all possible visual combinations for the Button:
 * - variant: Visual style (default, destructive, outline, etc.)
 * - size: Dimensional sizing (sm, md, lg, icon)
 *
 * Compound variants handle specific combinations that need special styling.
 */
export const buttonVariants = cva(
  // Base classes applied to all buttons
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "outline-none",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",
    "relative overflow-hidden",
  ],
  {
    variants: {
      /**
       * Visual variant styles.
       * Each variant defines a distinct visual appearance.
       */
      variant: {
        default: [
          "bg-primary text-primary-foreground shadow-sm",
          "hover:bg-primary/90 hover:shadow-md",
          "active:bg-primary/95 active:shadow-sm",
        ],
        destructive: [
          "bg-destructive text-white shadow-sm",
          "hover:bg-destructive/90 hover:shadow-md",
          "active:bg-destructive/95",
          "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        ],
        outline: [
          "border border-input bg-background/80 backdrop-blur-sm shadow-sm",
          "hover:bg-accent hover:text-accent-foreground hover:border-accent",
          "active:bg-accent/80",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground shadow-sm",
          "hover:bg-secondary/80 hover:shadow-md",
          "active:bg-secondary/90",
        ],
        ghost: ["hover:bg-accent hover:text-accent-foreground", "active:bg-accent/80"],
        link: ["text-primary underline-offset-4", "hover:underline hover:text-primary/80"],
      },

      /**
       * Size variant styles.
       * Each size defines height, padding, and font characteristics.
       */
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5 text-xs",
        md: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },

      /**
       * Full width modifier.
       */
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },

    /**
     * Compound variants for specific combinations.
     * These override base styles when multiple variants are combined.
     */
    compoundVariants: [
      // Icon-only buttons reset padding
      {
        size: "icon",
        className: "p-0",
      },
    ],

    /**
     * Default variant values.
     * Applied when no variant prop is specified.
     */
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
);

/**
 * Type for button variant props.
 * Extracts the variant types from the CVA configuration.
 */
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

/**
 * Loading overlay variant styles.
 * Applied to the loading indicator overlay.
 */
export const buttonLoaderVariants = cva(
  [
    "absolute inset-0 flex items-center justify-center",
    "opacity-0 transition-opacity duration-300",
  ],
  {
    variants: {
      loading: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      loading: false,
    },
  }
);

/**
 * Type for loader variant props.
 */
export type ButtonLoaderVariantProps = VariantProps<typeof buttonLoaderVariants>;
