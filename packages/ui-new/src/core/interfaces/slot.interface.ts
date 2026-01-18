import { ReactNode } from "react";

/**
 * Interface for components that support slot-based composition.
 * Implements the Slot pattern for flexible component composition.
 *
 * Following Single Responsibility Principle (SRP) - this interface
 * only defines the contract for slot-based rendering.
 */
export interface ISlottableComponent {
  /**
   * When true, the component will merge its props with its immediate child
   * instead of rendering its own element. This enables composition patterns
   * where you can pass custom elements while preserving the component's behavior.
   *
   * @example
   * ```tsx
   * // Without asChild - renders a button
   * <Button>Click me</Button>
   *
   * // With asChild - renders an anchor with button styles
   * <Button asChild>
   *   <a href="/page">Click me</a>
   * </Button>
   * ```
   *
   * @default false
   */
  asChild?: boolean;
}

/**
 * Interface for components that accept named slots.
 * Enables more complex composition patterns with multiple slot areas.
 *
 * @template S - The slot names as a string literal union
 */
export interface INamedSlotsComponent<S extends string> {
  /**
   * Named slots for different parts of the component
   */
  slots?: Partial<Record<S, ReactNode>>;
}

/**
 * Interface for components with start and end adornments.
 * Common pattern for inputs, buttons, and other interactive elements.
 */
export interface IAdornmentComponent {
  /**
   * Element to render at the start of the component
   */
  startAdornment?: ReactNode;

  /**
   * Element to render at the end of the component
   */
  endAdornment?: ReactNode;
}
