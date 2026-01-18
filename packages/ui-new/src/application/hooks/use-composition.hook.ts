"use client";

/**
 * Composition Hook Module
 *
 * Provides hooks for managing component composition patterns.
 * This follows the Single Responsibility Principle (SRP) - each hook
 * handles one specific aspect of component behavior.
 *
 * @module application/hooks/use-composition
 */

import { Children, isValidElement, ReactElement, ReactNode, useMemo } from "react";

/**
 * Options for the useSlotChildren hook.
 */
export interface UseSlotChildrenOptions {
  /**
   * Whether the component is using slot composition (asChild pattern)
   */
  asChild?: boolean;

  /**
   * The children to process
   */
  children?: ReactNode;
}

/**
 * Result from the useSlotChildren hook.
 */
export interface UseSlotChildrenResult {
  /**
   * Whether slot composition is active and valid
   */
  isSlotting: boolean;

  /**
   * The single child element (if slotting) or all children
   */
  slottedChild: ReactNode;

  /**
   * The original children, unmodified
   */
  children: ReactNode;
}

/**
 * Hook to manage slot composition patterns.
 *
 * When using the asChild pattern, this hook validates that there is
 * exactly one child element and prepares it for slot composition.
 *
 * @param options - The hook options
 * @returns Object containing slot composition state
 *
 * @example
 * ```tsx
 * function Button({ asChild, children, ...props }) {
 *   const { isSlotting, slottedChild } = useSlotChildren({ asChild, children });
 *
 *   const Comp = isSlotting ? Slot : "button";
 *
 *   return <Comp {...props}>{slottedChild}</Comp>;
 * }
 * ```
 */
export function useSlotChildren(options: UseSlotChildrenOptions): UseSlotChildrenResult {
  const { asChild = false, children } = options;

  return useMemo(() => {
    if (!asChild) {
      return {
        isSlotting: false,
        slottedChild: children,
        children,
      };
    }

    const childArray = Children.toArray(children);
    const validChildren = childArray.filter(isValidElement);

    // For asChild to work properly, there should be exactly one valid element
    if (validChildren.length !== 1) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "useSlotChildren: When using asChild, component should have exactly one child element. " +
            `Found ${validChildren.length} valid elements.`
        );
      }
      return {
        isSlotting: false,
        slottedChild: children,
        children,
      };
    }

    return {
      isSlotting: true,
      slottedChild: validChildren[0],
      children,
    };
  }, [asChild, children]);
}

/**
 * Options for the useCompoundComponent hook.
 */
export interface UseCompoundComponentOptions<T extends string> {
  /**
   * The children to analyze
   */
  children?: ReactNode;

  /**
   * The expected slot names to look for
   */
  slotNames: readonly T[];
}

/**
 * Result from the useCompoundComponent hook.
 */
export type UseCompoundComponentResult<T extends string> = {
  /**
   * Map of slot names to their corresponding children
   */
  slots: Record<T, ReactElement[]>;

  /**
   * Children that don't match any slot
   */
  rest: ReactNode[];
};

/**
 * Hook to manage compound component patterns.
 *
 * Analyzes children and groups them by their display name,
 * enabling the compound component pattern (e.g., Card.Header, Card.Body).
 *
 * @template T - The slot name type
 * @param options - The hook options
 * @returns Object containing grouped slots and remaining children
 *
 * @example
 * ```tsx
 * function Card({ children }) {
 *   const { slots, rest } = useCompoundComponent({
 *     children,
 *     slotNames: ["Header", "Body", "Footer"] as const,
 *   });
 *
 *   return (
 *     <div>
 *       {slots.Header}
 *       {slots.Body}
 *       {rest}
 *       {slots.Footer}
 *     </div>
 *   );
 * }
 * ```
 */
export function useCompoundComponent<T extends string>(
  options: UseCompoundComponentOptions<T>
): UseCompoundComponentResult<T> {
  const { children, slotNames } = options;

  return useMemo(() => {
    const slots = {} as Record<T, ReactElement[]>;
    const rest: ReactNode[] = [];

    // Initialize empty arrays for each slot
    slotNames.forEach((name) => {
      slots[name] = [];
    });

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        rest.push(child);
        return;
      }

      // Get the display name of the child component
      const displayName =
        typeof child.type === "function"
          ? (child.type as { displayName?: string }).displayName
          : typeof child.type === "string"
            ? child.type
            : undefined;

      // Check if this child matches any of our slot names
      const matchedSlot = slotNames.find(
        (name) =>
          displayName === name ||
          displayName?.endsWith(`.${name}`)
      );

      if (matchedSlot) {
        slots[matchedSlot].push(child);
      } else {
        rest.push(child);
      }
    });

    return { slots, rest };
  }, [children, slotNames]);
}
