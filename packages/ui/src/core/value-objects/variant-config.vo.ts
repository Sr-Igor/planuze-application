/**
 * Value Object for variant configuration.
 *
 * This class encapsulates the logic for managing component variants,
 * following the Value Object pattern from Domain-Driven Design.
 *
 * Value Objects are immutable and compared by their attributes rather
 * than identity. They help ensure consistency in variant handling.
 *
 * @template V - The variant configuration type
 */
export class VariantConfig<V extends Record<string, unknown>> {
  private readonly variants: V;

  /**
   * Creates a new VariantConfig instance.
   *
   * @param variants - The variant props to encapsulate
   */
  constructor(variants: V) {
    this.variants = Object.freeze({ ...variants }) as V;
  }

  /**
   * Gets the current variant configuration.
   *
   * @returns The frozen variant props
   */
  public getVariants(): Readonly<V> {
    return this.variants;
  }

  /**
   * Creates a new VariantConfig with merged variants.
   * Since Value Objects are immutable, this returns a new instance.
   *
   * @param overrides - Partial variants to merge
   * @returns A new VariantConfig with merged variants
   */
  public merge(overrides: Partial<V>): VariantConfig<V> {
    return new VariantConfig({
      ...this.variants,
      ...overrides,
    } as V);
  }

  /**
   * Checks if this VariantConfig equals another.
   * Value Objects are compared by their attributes.
   *
   * @param other - The other VariantConfig to compare
   * @returns True if all variant values match
   */
  public equals(other: VariantConfig<V>): boolean {
    const thisVariants = this.variants;
    const otherVariants = other.getVariants();

    const thisKeys = Object.keys(thisVariants) as Array<keyof V>;
    const otherKeys = Object.keys(otherVariants) as Array<keyof V>;

    if (thisKeys.length !== otherKeys.length) {
      return false;
    }

    return thisKeys.every((key) => thisVariants[key] === otherVariants[key]);
  }

  /**
   * Creates a string representation of the variant configuration.
   *
   * @returns A string describing the variants
   */
  public toString(): string {
    return JSON.stringify(this.variants);
  }
}

/**
 * Factory function to create a VariantConfig.
 * Provides a more ergonomic API for creating Value Objects.
 *
 * @template V - The variant configuration type
 * @param variants - The variant props
 * @returns A new VariantConfig instance
 */
export function createVariantConfig<V extends Record<string, unknown>>(
  variants: V
): VariantConfig<V> {
  return new VariantConfig(variants);
}
