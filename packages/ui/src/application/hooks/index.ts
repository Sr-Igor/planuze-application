/**
 * Application Hooks Module
 *
 * Custom hooks that encapsulate reusable logic for UI components.
 * Following the Single Responsibility Principle (SRP), each hook
 * handles one specific concern.
 *
 * These hooks provide:
 * - Composition patterns (slot, compound components)
 * - State management (controllable state)
 * - Common UI behaviors
 *
 * @module application/hooks
 */

export {
  useCompoundComponent,
  useSlotChildren,
} from "./use-composition.hook";
export type {
  UseCompoundComponentOptions,
  UseCompoundComponentResult,
  UseSlotChildrenOptions,
  UseSlotChildrenResult,
} from "./use-composition.hook";

export {
  useControllableBooleanState,
  useControllableState,
} from "./use-controllable-state.hook";
export type {
  UseControllableStateOptions,
  UseControllableStateReturn,
} from "./use-controllable-state.hook";

export { useIsMobile } from "./use-mobile.hook";
