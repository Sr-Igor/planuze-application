/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

"use client";

import { ElementRef, forwardRef } from "react";

import { Slot } from "../../../infrastructure/adapters";
import { cn } from "../../../shared/utils";
import { ButtonLoaderProps, ButtonProps } from "./button.types";
import { buttonVariants } from "./button.variants";

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Button Component Module
 *
 * A versatile button component that supports multiple variants, sizes,
 * and states. Built following SOLID principles:
 *
 * - Single Responsibility: Each subcomponent has one job
 * - Open/Closed: Extendable via variants, closed for modification
 * - Liskov Substitution: Can replace native button seamlessly
 * - Interface Segregation: Props are composable interfaces
 * - Dependency Inversion: Depends on abstractions (Slot adapter)
 *
 * @module presentation/primitives/button
 */

/**
 * Default loading indicator component.
 * Renders an animated spinner icon.
 */
const DefaultLoader = () => (
  <svg
    className="size-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button loading overlay subcomponent.
 * Renders a loading indicator over the button content.
 *
 * @internal
 */
const ButtonLoader = ({
  className,
  children,
  loading,
  variant,
}: ButtonLoaderProps & { loading?: boolean; variant?: string }) => (
  <span
    className={cn(
      // Apply variant styles to match button appearance
      variant && buttonVariants({ variant: variant as ButtonProps["variant"] }),
      // Overlay positioning and opacity
      "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300",
      loading && "opacity-100",
      className
    )}
    aria-hidden={!loading}
  >
    {children ?? <DefaultLoader />}
  </span>
);

ButtonLoader.displayName = "Button.Loader";

/**
 * Button component.
 *
 * A polymorphic button that can render as different elements using the
 * `asChild` prop. Supports loading states, icons, and multiple visual variants.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variant and size
 * <Button variant="destructive" size="lg">Delete</Button>
 *
 * // With loading state
 * <Button loading>Saving...</Button>
 *
 * // With icons
 * <Button leftIcon={<PlusIcon />}>Add Item</Button>
 *
 * // As a link (polymorphic)
 * <Button asChild>
 *   <a href="/page">Go to page</a>
 * </Button>
 *
 * // Full width
 * <Button fullWidth>Submit</Button>
 * ```
 */
const Button = forwardRef<ElementRef<"button">, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      loadingIndicator,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the component to render
    const Comp = asChild ? Slot : "button";

    // Button is disabled when loading or explicitly disabled
    const isDisabled = loading || disabled;

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-loading={loading || undefined}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {/* Left icon */}
        {leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Main content */}
        <span
          className={cn(
            "inline-flex flex-1 items-center justify-center gap-2 transition-opacity",
            loading && "opacity-0"
          )}
        >
          {children}
        </span>

        {/* Right icon */}
        {rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Loading overlay */}
        {/* <ButtonLoader loading={loading} variant={variant}>
          {loadingIndicator}
        </ButtonLoader> */}
      </Comp>
    );
  }
);

Button.displayName = "Button";

/**
 * IconButton component.
 *
 * A specialized button for icon-only content.
 * Provides proper sizing and accessibility.
 *
 * @example
 * ```tsx
 * <IconButton aria-label="Close">
 *   <CloseIcon />
 * </IconButton>
 * ```
 */
const IconButton = forwardRef<
  ElementRef<"button">,
  Omit<ButtonProps, "leftIcon" | "rightIcon" | "size"> & {
    /**
     * Accessible label for the icon button (required for a11y)
     */
    "aria-label": string;
  }
>((props, ref) => {
  return <Button ref={ref} size="icon" {...props} />;
});

IconButton.displayName = "IconButton";

/**
 * Export components.
 */
export { Button, IconButton };

/**
 * Re-export variant configuration for external use.
 * Enables custom components to use the same styling system.
 */
export { buttonVariants } from "./button.variants";

/**
 * Re-export types for consumers.
 */
export type { ButtonProps } from "./button.types";
