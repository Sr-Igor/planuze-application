/**
 * Value Objects Module
 *
 * Value Objects are immutable objects that represent descriptive aspects
 * of the domain with no conceptual identity. They are compared by their
 * attributes rather than by reference.
 *
 * In the context of a UI library, Value Objects help ensure consistency
 * and immutability when handling component configurations.
 *
 * @module core/value-objects
 */

export { createVariantConfig, VariantConfig } from "./variant-config.vo";
