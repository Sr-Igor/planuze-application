/**
 * Infrastructure Factories Module
 *
 * Factory functions provide a way to create objects without specifying
 * their exact class. This follows the Factory Pattern and enables:
 *
 * - Consistent object creation across the codebase
 * - Encapsulation of creation logic
 * - Easy testing and mocking
 * - Open/Closed Principle compliance
 *
 * @module infrastructure/factories
 */

export {
  createComposite,
  createPrimitive,
} from "./component.factory";
export type {
  ComponentProps,
  ComponentRef,
  CreateCompositeOptions,
  CreatePrimitiveOptions,
  PrimitiveProps,
} from "./component.factory";

export {
  cva,
  mergeVariantClasses,
} from "./variant.factory";
export type {
  VariantConfig,
  VariantProps,
} from "./variant.factory";
