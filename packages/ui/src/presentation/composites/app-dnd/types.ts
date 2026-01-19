/**
 * Types for AppDnd module
 */

export interface DndDropResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  } | null;
  reason: "DROP" | "CANCEL";
  mode: "FLUID" | "SNAP";
  combine?: {
    draggableId: string;
    droppableId: string;
  } | null;
}

export interface DndProviderProps<T = unknown> {
  /**
   * Items to be reordered
   */
  items: T[];
  /**
   * Callback when items are reordered
   */
  setOrder: (items: T[]) => void;
  /**
   * Children to render
   */
  children: React.ReactNode;
  /**
   * Callback when drag ends
   */
  onDragEnd?: (result: DndDropResult) => void;
}

export interface DraggableItemProps<T = unknown> {
  /**
   * Item being dragged
   */
  item: T & { id?: string; local_id?: string };
  /**
   * Index of the item
   */
  index?: number;
  /**
   * Children to render
   */
  children: React.ReactNode;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
}

export interface DndDraggableProvided {
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: {
    style?: React.CSSProperties;
    [key: string]: unknown;
  };
  dragHandleProps?: {
    [key: string]: unknown;
  } | null;
}

export interface DndDraggableSnapshot {
  isDragging: boolean;
  isDropAnimating: boolean;
  draggingOver?: string | null;
  dropAnimation?: unknown;
  mode?: "FLUID" | "SNAP";
  combineWith?: string | null;
  combineTargetFor?: string | null;
}

export interface DndDroppableProvided {
  innerRef: (element: HTMLElement | null) => void;
  droppableProps: {
    [key: string]: unknown;
  };
  placeholder?: React.ReactNode;
}

export interface DndDroppableSnapshot {
  isDraggingOver: boolean;
  draggingOverWith?: string | null;
  draggingFromThisWith?: string | null;
  isUsingPlaceholder: boolean;
}

export interface DndComponents {
  /**
   * DragDropContext component
   */
  DragDropContext: React.ComponentType<{
    onDragEnd: (result: DndDropResult) => void;
    children: React.ReactNode;
  }>;
  /**
   * Droppable component
   */
  Droppable: React.ComponentType<{
    droppableId: string;
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    ignoreContainerClipping?: boolean;
    direction?: "vertical" | "horizontal";
    type?: string;
    children: (provided: DndDroppableProvided, snapshot: DndDroppableSnapshot) => React.ReactNode;
  }>;
  /**
   * Draggable component
   */
  Draggable: React.ComponentType<{
    draggableId: string;
    index: number;
    children: (provided: DndDraggableProvided, snapshot: DndDraggableSnapshot) => React.ReactNode;
  }>;
}
