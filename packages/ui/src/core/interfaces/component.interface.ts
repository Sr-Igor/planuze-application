import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * Base interface for all UI components.
 * Implements Interface Segregation Principle (ISP) - components only implement
 * what they need from this base interface.
 *
 * @template E - The HTML element type this component renders as
 */
export interface IBaseComponent<E extends ElementType = "div"> {
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;

  /**
   * Children elements to render inside the component
   */
  children?: ReactNode;

  /**
   * Allows the component to render as a different element or component
   * Enables composition and polymorphism
   */
  asChild?: boolean;
}

/**
 * Interface for components that support polymorphic rendering.
 * Follows Open/Closed Principle (OCP) - open for extension via the 'as' prop.
 *
 * @template E - The default element type
 */
export interface IPolymorphicComponent<E extends ElementType = "div">
  extends IBaseComponent<E> {
  /**
   * The element type to render as
   * @default The component's default element
   */
  as?: E;
}

/**
 * Utility type to get props for a polymorphic component.
 * Merges component props with the native element props.
 *
 * @template E - The element type
 * @template P - Additional props specific to the component
 */
export type PolymorphicComponentProps<
  E extends ElementType,
  P = object,
> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P> & {
    as?: E;
  };

/**
 * Interface for components that can be in a loading state.
 * Single Responsibility - handles only loading behavior.
 */
export interface ILoadableComponent {
  /**
   * Whether the component is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Custom loading indicator to display
   */
  loadingIndicator?: ReactNode;
}

/**
 * Interface for components that can be disabled.
 * Single Responsibility - handles only disabled behavior.
 */
export interface IDisableableComponent {
  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Interface for components that support size variants.
 * Enables consistent sizing across the design system.
 */
export interface ISizeableComponent<
  S extends string = "sm" | "md" | "lg",
> {
  /**
   * The size variant of the component
   * @default "md"
   */
  size?: S;
}

/**
 * Interface for components that support visual variants.
 * Enables consistent styling patterns across the design system.
 */
export interface IVariantComponent<V extends string = string> {
  /**
   * The visual variant of the component
   */
  variant?: V;
}
