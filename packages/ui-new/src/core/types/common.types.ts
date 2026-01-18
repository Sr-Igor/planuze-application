/**
 * Common Types Module
 *
 * Centralized type definitions used across the UI library.
 * Following DRY principle - these types are defined once and reused.
 *
 * @module core/types/common
 */

/**
 * Standard size options used across components.
 * Provides consistent sizing vocabulary throughout the design system.
 */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Standard spacing scale based on a 4px grid system.
 * Maps to Tailwind CSS spacing utilities.
 */
export type Spacing =
  | "0"
  | "0.5"
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "52"
  | "56"
  | "60"
  | "64"
  | "72"
  | "80"
  | "96";

/**
 * Standard border radius options.
 */
export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

/**
 * Standard color intent/semantic tokens.
 * Maps to CSS custom properties defined in the theme.
 */
export type ColorIntent =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "muted";

/**
 * Interactive state modifiers.
 * Used for styling components in different states.
 */
export type InteractiveState =
  | "default"
  | "hover"
  | "focus"
  | "active"
  | "disabled";

/**
 * Orientation options for layout components.
 */
export type Orientation = "horizontal" | "vertical";

/**
 * Alignment options for flex/grid layouts.
 */
export type Alignment = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Justify options for flex/grid layouts.
 */
export type Justify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

/**
 * Position options for absolute/fixed positioning.
 */
export type Position =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

/**
 * Animation timing options.
 */
export type AnimationTiming = "instant" | "fast" | "normal" | "slow";

/**
 * Z-index layer tokens for consistent stacking.
 */
export type ZLayer =
  | "base"
  | "dropdown"
  | "sticky"
  | "fixed"
  | "modal"
  | "popover"
  | "tooltip";

/**
 * Utility type to make specific properties required.
 *
 * @template T - The base type
 * @template K - Keys to make required
 */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type to make specific properties optional.
 *
 * @template T - The base type
 * @template K - Keys to make optional
 */
export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * Utility type to extract the value type from an object type.
 *
 * @template T - The object type
 */
export type ValueOf<T> = T[keyof T];

/**
 * Utility type for className prop that can be a string or undefined.
 */
export type ClassName = string | undefined;

/**
 * Callback function type for event handlers.
 *
 * @template T - The event or value type
 */
export type Callback<T = void> = (value: T) => void;

/**
 * Async callback function type.
 *
 * @template T - The event or value type
 */
export type AsyncCallback<T = void> = (value: T) => Promise<void>;
