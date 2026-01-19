"use client";

/**
 * Controllable State Hook Module
 *
 * Provides a hook for managing state that can be either controlled
 * (by the parent) or uncontrolled (internal state).
 *
 * This pattern is essential for building flexible components that
 * can work both as controlled and uncontrolled inputs.
 *
 * @module application/hooks/use-controllable-state
 */

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Options for the useControllableState hook.
 *
 * @template T - The state value type
 */
export interface UseControllableStateOptions<T> {
  /**
   * The controlled value (if provided, component is controlled)
   */
  value?: T;

  /**
   * The default value for uncontrolled mode
   */
  defaultValue?: T;

  /**
   * Callback when the value changes
   */
  onChange?: (value: T) => void;
}

/**
 * Return type for the useControllableState hook.
 *
 * @template T - The state value type
 */
export type UseControllableStateReturn<T> = [
  T,
  (value: T | ((prev: T) => T)) => void,
];

/**
 * Hook for managing controllable state.
 *
 * This hook enables components to work in both controlled and uncontrolled
 * modes, following React's patterns for form inputs.
 *
 * - Controlled: Parent provides `value` and `onChange`
 * - Uncontrolled: Uses internal state with optional `defaultValue`
 *
 * @template T - The state value type
 *
 * @param options - The hook options
 * @returns A tuple of [value, setValue]
 *
 * @example
 * ```tsx
 * function Input({ value, defaultValue, onChange, ...props }) {
 *   const [internalValue, setInternalValue] = useControllableState({
 *     value,
 *     defaultValue: defaultValue ?? "",
 *     onChange,
 *   });
 *
 *   return (
 *     <input
 *       value={internalValue}
 *       onChange={(e) => setInternalValue(e.target.value)}
 *       {...props}
 *     />
 *   );
 * }
 *
 * // Controlled usage
 * <Input value={text} onChange={setText} />
 *
 * // Uncontrolled usage
 * <Input defaultValue="initial" />
 * ```
 */
export function useControllableState<T>(
  options: UseControllableStateOptions<T>
): UseControllableStateReturn<T> {
  const { value: controlledValue, defaultValue, onChange } = options;

  // Determine if we're in controlled mode
  const isControlled = controlledValue !== undefined;
  const isControlledRef = useRef(isControlled);

  // Warn if switching between controlled and uncontrolled
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (isControlledRef.current !== isControlled) {
        console.warn(
          "useControllableState: Component is switching between controlled and uncontrolled modes. " +
            "This is not supported and may cause unexpected behavior. " +
            "Decide between using a controlled or uncontrolled component for the lifetime of the component."
        );
      }
    }
    isControlledRef.current = isControlled;
  }, [isControlled]);

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<T>(
    defaultValue as T
  );

  // The actual value to use
  const value = isControlled ? controlledValue : internalValue;

  // Stable setValue function
  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (prev: T) => T)(value)
          : nextValue;

      // In uncontrolled mode, update internal state
      if (!isControlled) {
        setInternalValue(resolvedValue);
      }

      // Always call onChange if provided
      onChange?.(resolvedValue);
    },
    [isControlled, onChange, value]
  );

  return [value, setValue];
}

/**
 * Hook for managing a boolean controllable state.
 * Convenience wrapper around useControllableState for boolean values.
 *
 * @param options - The hook options
 * @returns A tuple of [value, setValue, toggle]
 *
 * @example
 * ```tsx
 * function Toggle({ open, defaultOpen, onOpenChange }) {
 *   const [isOpen, setIsOpen, toggle] = useControllableBooleanState({
 *     value: open,
 *     defaultValue: defaultOpen ?? false,
 *     onChange: onOpenChange,
 *   });
 *
 *   return <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>;
 * }
 * ```
 */
export function useControllableBooleanState(
  options: UseControllableStateOptions<boolean>
): [boolean, (value: boolean) => void, () => void] {
  const [value, setValue] = useControllableState<boolean>({
    ...options,
    defaultValue: options.defaultValue ?? false,
  });

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, [setValue]);

  return [value, setValue, toggle];
}
