/**
 * Component Factory Module
 *
 * Provides factory functions for creating UI components with consistent
 * patterns and behaviors. This follows the Factory Pattern combined with
 * the Open/Closed Principle (OCP).
 *
 * Benefits:
 * - Consistent component structure across the library
 * - Easy to extend without modifying existing code
 * - Centralized component creation logic
 *
 * @module infrastructure/factories/component
 */

import {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";

import { cn } from "../../shared/utils/cn";

/**
 * Options for creating a primitive component.
 */
export interface CreatePrimitiveOptions {
  /**
   * Display name for the component (used in React DevTools)
   */
  displayName: string;

  /**
   * The default element tag to render
   */
  element: ElementType;

  /**
   * Base CSS classes always applied to the component
   */
  baseClassName?: string;
}

/**
 * Props type for primitive components created by the factory.
 */
export type PrimitiveProps = HTMLAttributes<HTMLElement>;

/**
 * Creates a primitive component that wraps a native HTML element.
 * This is useful for creating styled base components.
 *
 * @param options - Configuration options for the primitive
 * @returns A forward-ref component
 *
 * @example
 * ```tsx
 * const Box = createPrimitive({
 *   displayName: "Box",
 *   element: "div",
 *   baseClassName: "block",
 * });
 *
 * // Usage
 * <Box className="p-4">Content</Box>
 * ```
 */
export function createPrimitive(
  options: CreatePrimitiveOptions
): ForwardRefExoticComponent<PrimitiveProps & RefAttributes<HTMLElement>> {
  const { displayName, element: Element, baseClassName } = options;

  const Component = forwardRef<HTMLElement, PrimitiveProps>(
    ({ className, ...props }, ref) => {
      return (
        <Element
          ref={ref}
          className={cn(baseClassName, className)}
          {...props}
        />
      );
    }
  );

  Component.displayName = displayName;

  return Component;
}

/**
 * Options for creating a composite component.
 */
export interface CreateCompositeOptions<TProps, TElement extends HTMLElement> {
  /**
   * Display name for the component
   */
  displayName: string;

  /**
   * The render function for the component
   */
  render: (props: TProps, ref: React.ForwardedRef<TElement>) => React.ReactElement;
}

/**
 * Creates a composite component with forwarded ref.
 * This is a convenience wrapper around forwardRef with proper typing.
 *
 * @template TProps - The component props type
 * @template TElement - The ref element type
 *
 * @param options - Configuration options for the composite
 * @returns A forward-ref component
 *
 * @example
 * ```tsx
 * interface CardProps {
 *   title: string;
 *   children: React.ReactNode;
 * }
 *
 * const Card = createComposite<CardProps, HTMLDivElement>({
 *   displayName: "Card",
 *   render: ({ title, children }, ref) => (
 *     <div ref={ref}>
 *       <h2>{title}</h2>
 *       {children}
 *     </div>
 *   ),
 * });
 * ```
 */
export function createComposite<TProps extends object, TElement extends HTMLElement = HTMLDivElement>(
  options: CreateCompositeOptions<TProps, TElement>
): ForwardRefExoticComponent<TProps & RefAttributes<TElement>> {
  const { displayName, render } = options;

  const Component = forwardRef<TElement, TProps>((props, ref) => {
    return render(props as TProps, ref);
  });

  Component.displayName = displayName;

  return Component as ForwardRefExoticComponent<TProps & RefAttributes<TElement>>;
}

/**
 * Utility type for extracting the ref type from a button element.
 */
export type ComponentRef<T extends ElementType> = T extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[T]
  : HTMLElement;

/**
 * Utility type for extracting props from a component excluding ref.
 */
export type ComponentProps<T extends ElementType> = ComponentPropsWithoutRef<T>;
