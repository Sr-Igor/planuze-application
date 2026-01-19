/**
 * AppDnd Composite Component
 *
 * A drag and drop module for reordering items.
 * Framework-agnostic - requires DnD components to be injected via context.
 *
 * @module presentation/composites/app-dnd
 */

export { DndContextProvider, useDndComponents, useDndReady } from "./context";
export type { DndContextProviderProps } from "./context";

export {
  DndLoadingFallback,
  DndProvider,
  DndProvider as ProviderDND,
  DndWrapper,
  DraggableItem,
} from "./components";
export type { DndWrapperProps } from "./components";

export { useDndStyles } from "./hooks";

export type {
  DndComponents,
  DndDraggableProvided,
  DndDraggableSnapshot,
  DndDroppableProvided,
  DndDroppableSnapshot,
  DndDropResult,
  DndProviderProps,
  DraggableItemProps,
} from "./types";
