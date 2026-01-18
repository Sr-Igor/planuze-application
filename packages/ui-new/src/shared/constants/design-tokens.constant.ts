/**
 * Design Tokens Module
 *
 * Centralized design tokens that define the visual language of the UI library.
 * These tokens ensure consistency across all components.
 *
 * @module shared/constants/design-tokens
 */

/**
 * Size scale tokens.
 * Maps semantic size names to pixel values.
 */
export const SIZE_TOKENS = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
} as const;

/**
 * Spacing scale tokens (based on 4px grid).
 */
export const SPACING_TOKENS = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  3.5: "14px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

/**
 * Border radius tokens.
 */
export const RADIUS_TOKENS = {
  none: "0px",
  sm: "2px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
} as const;

/**
 * Z-index layer tokens.
 */
export const Z_LAYER_TOKENS = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
} as const;

/**
 * Animation duration tokens (in milliseconds).
 */
export const ANIMATION_DURATION_TOKENS = {
  instant: 0,
  fast: 150,
  normal: 200,
  slow: 300,
} as const;

/**
 * Animation easing tokens.
 */
export const ANIMATION_EASING_TOKENS = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/**
 * Breakpoint tokens for responsive design.
 */
export const BREAKPOINT_TOKENS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Font size tokens.
 */
export const FONT_SIZE_TOKENS = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
} as const;

/**
 * Font weight tokens.
 */
export const FONT_WEIGHT_TOKENS = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/**
 * Line height tokens.
 */
export const LINE_HEIGHT_TOKENS = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;
