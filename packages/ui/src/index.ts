/**
 * @repo/ui
 *
 * A scalable and maintainable UI component library built with SOLID principles
 * and Clean Architecture patterns.
 *
 * @module @repo/ui
 */

// ============================================================================
// Core Layer Exports
// ============================================================================

export type {
  IBaseComponent,
  IDisableableComponent,
  ILoadableComponent,
  IPolymorphicComponent,
  ISizeableComponent,
  ISlottableComponent,
  IVariantComponent,
  PolymorphicComponentProps,
} from "./core/interfaces";

export type {
  Alignment,
  Callback,
  ClassName,
  ColorIntent,
  Orientation,
  Position,
  Size,
  Spacing,
} from "./core/types";

export { createVariantConfig, VariantConfig } from "./core/value-objects";

// ============================================================================
// Application Layer Exports
// ============================================================================

export {
  useCompoundComponent,
  useControllableBooleanState,
  useControllableState,
  useIsMobile,
  useSlotChildren,
} from "./application/hooks";

export type {
  UseCompoundComponentOptions,
  UseControllableStateOptions,
  UseSlotChildrenOptions,
} from "./application/hooks";

// ============================================================================
// Infrastructure Layer Exports
// ============================================================================

export { Slot, Slottable } from "./infrastructure/adapters";

export {
  createComposite,
  createPrimitive,
  cva,
} from "./infrastructure/factories";

export type {
  ComponentProps,
  ComponentRef,
  VariantProps,
} from "./infrastructure/factories";

// ============================================================================
// Presentation Layer Exports - Primitives
// ============================================================================

export * from "./presentation/primitives";

// ============================================================================
// Presentation Layer Exports - Composites
// ============================================================================

export * from "./presentation/composites";

// ============================================================================
// Shared Exports
// ============================================================================

export { cn } from "./shared/utils";

export {
  ANIMATION_DURATION_TOKENS,
  ANIMATION_EASING_TOKENS,
  BREAKPOINT_TOKENS,
  RADIUS_TOKENS,
  SIZE_TOKENS,
  SPACING_TOKENS,
  Z_LAYER_TOKENS,
} from "./shared/constants";
