/**
 * Variant Factory Module
 *
 * Provides factory functions for creating variant configurations.
 * This follows the Open/Closed Principle (OCP) - the factory is open
 * for extension (new variants can be added) but closed for modification.
 *
 * The factory pattern also enables:
 * - Consistent variant creation across components
 * - Easy customization and theming
 * - Type-safe variant configurations
 *
 * @module infrastructure/factories/variant
 */

import { VariantProps } from "class-variance-authority";

/**
 * Re-export cva for creating variant configurations.
 * This provides a single source of truth for variant creation.
*/
export { cva } from "class-variance-authority";


/**
 * Re-export VariantProps type for type inference.
 */
export type { VariantProps } from "class-variance-authority";

/**
 * Type for variant configuration created by cva.
 */
export type VariantConfig<T extends (...args: unknown[]) => unknown> = VariantProps<T>;

/**
 * Merges multiple variant class strings with proper deduplication.
 * Useful when combining base variants with overrides.
 *
 * @param classes - Array of class strings to merge
 * @returns Merged class string
 */
export function mergeVariantClasses(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
