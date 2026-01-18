/**
 * Class Name Utility Module
 *
 * Provides utilities for merging CSS class names with proper
 * handling of Tailwind CSS classes.
 *
 * @module shared/utils/cn
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge.
 *
 * This function combines the power of:
 * - clsx: Conditional class name handling
 * - tailwind-merge: Intelligent Tailwind class deduplication
 *
 * @param inputs - Class values to merge (strings, arrays, objects, etc.)
 * @returns A merged class string with proper Tailwind handling
 *
 * @example
 * ```ts
 * // Basic usage
 * cn("px-4", "py-2", "bg-blue-500")
 * // => "px-4 py-2 bg-blue-500"
 *
 * // Conditional classes
 * cn("base-class", isActive && "active", hasError && "error")
 * // => "base-class active" (if isActive is true, hasError is false)
 *
 * // Object syntax
 * cn("base", { "text-red-500": hasError, "text-green-500": isSuccess })
 * // => "base text-red-500" (if hasError is true)
 *
 * // Tailwind conflict resolution
 * cn("px-4", "px-8")
 * // => "px-8" (later class wins)
 *
 * // Complex example
 * cn(
 *   "inline-flex items-center",
 *   variant === "primary" && "bg-blue-500 text-white",
 *   variant === "secondary" && "bg-gray-200 text-gray-800",
 *   size === "sm" && "text-sm px-2",
 *   size === "lg" && "text-lg px-6",
 *   className // User-provided override
 * )
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Re-export ClassValue type for external use.
 */
export type { ClassValue } from "clsx";
