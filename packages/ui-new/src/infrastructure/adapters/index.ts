/**
 * Infrastructure Adapters Module
 *
 * Adapters provide an abstraction layer over external dependencies,
 * following the Dependency Inversion Principle (DIP) from SOLID.
 *
 * This allows us to:
 * - Easily swap implementations without changing component code
 * - Mock dependencies in tests
 * - Maintain a consistent API across the library
 *
 * @module infrastructure/adapters
 */

export { shouldUseSlot, Slot, Slottable } from "./slot.adapter";
export type { SlotProps, SlottableProps } from "./slot.adapter";
