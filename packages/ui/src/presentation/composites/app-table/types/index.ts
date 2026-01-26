/**
 * AppTable Types Module
 *
 * Type definitions for the AppTable component.
 *
 * @module presentation/composites/app-table/types
 */
import { ReactNode } from "react";

// ============================================================================
// Base Types
// ============================================================================

export interface BaseTableItem {
  id: string;
}

export interface TablePagination {
  page: number;
  pages: number;
  limit: number;
  count: number;
}

export interface TableSorting {
  orderKey: string;
  orderValue: "asc" | "desc" | "";
}

export interface TableFilters extends TablePagination, TableSorting {
  [key: string]: unknown;
}

// ============================================================================
// Column Types
// ============================================================================

type RecursiveKeys<T, Depth extends number = 3> = Depth extends 0
  ? ""
  : T extends object
    ? {
        [K in keyof T]: K extends string
          ? K | `${K}.${RecursiveKeys<T[K], Decrement<Depth>> & string}`
          : never;
      }[keyof T]
    : "";

type Decrement<N extends number> = N extends 1
  ? 0
  : N extends 2
    ? 1
    : N extends 3
      ? 2
      : N extends 4
        ? 3
        : N extends 5
          ? 4
          : N extends 6
            ? 5
            : N extends 7
              ? 6
              : N extends 8
                ? 7
                : N extends 9
                  ? 8
                  : never;

export type TableColumnAccessor<T> = RecursiveKeys<T>;

export interface TableColumn<T extends BaseTableItem> {
  title: string;
  accessor: TableColumnAccessor<T>;
  headerClassName?: string;
  cellClassName?: string;
  sortable?: boolean;
  centered?: boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  resizable?: boolean;
  customRender?: (item: T, isLoading: boolean, cellClassName: string) => ReactNode;
  formatValue?: (item: T) => ReactNode;
  breakpoint?: number;
  sticky?: "left" | "right";
}

// ============================================================================
// Action Types
// ============================================================================

export interface TableAction<T extends BaseTableItem> {
  label: string;
  icon?: ReactNode;
  variant?: "default" | "destructive";
  separatorTop?: boolean;
  separatorBottom?: boolean;
  onClick: (item: T) => Promise<void> | void;
  preOnClick?: (item: T) => Promise<void> | void;
  isVisible?: (item: T) => boolean;
  isDisabled?: (item: T) => boolean;
  confirmText?: string;
  tooltip?: string;
}

// ============================================================================
// State Types
// ============================================================================

export interface TableState {
  selectedItems: string[];
  loadingItems: string[];
  expandedItems: string[];
}

// ============================================================================
// Event Types
// ============================================================================

export interface TableEventHandlers<T extends BaseTableItem> {
  onFiltersChange: (filters: Partial<TableFilters>) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  onRowClick?: (item: T) => void;
  onRowDoubleClick?: (item: T) => void;
  onExpandRow?: (item: T) => void;
}

// ============================================================================
// Labels Types
// ============================================================================

export interface TableLabels {
  selectAll?: string;
  actions?: string;
  openMenu?: string;
  confirmAction?: string;
  cancel?: string;
  confirm?: string;
  limit?: string;
  total?: string;
  noDataFound?: string;
  emptyData?: string;
}

// ============================================================================
// Props Types
// ============================================================================

export interface TableProps<T extends BaseTableItem> {
  data: T[];
  columns: TableColumn<T>[];
  filters: TableFilters;
  state?: Partial<TableState>;
  loading?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  actions?: TableAction<T>[];
  events: TableEventHandlers<T>;
  emptyMessage?: string;
  loadingMessage?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "striped" | "bordered";
  virtualized?: boolean;
  itemHeight?: number;
  estimatedItemSize?: number;
  disabledCheckbox?: (item: T) => boolean;
  height?: string | number;
  labels?: TableLabels;
}

// ============================================================================
// Hook Types
// ============================================================================

export interface UseTableFiltersProps<T extends BaseTableItem> {
  initialFilters: TableFilters;
  onFiltersChange: (filters: Partial<TableFilters>) => void;
}

export interface UseTableSelectionProps {
  initialSelected?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

export interface UseTableSortingProps<T extends BaseTableItem> {
  columns: TableColumn<T>[];
  onSortChange: (orderKey: string, orderValue: "asc" | "desc" | "") => void;
}

// ============================================================================
// Context Types
// ============================================================================

export interface TableContextValue<T extends BaseTableItem> {
  data: T[];
  columns: TableColumn<T>[];
  filters: TableFilters;
  state: TableState;
  actions: TableAction<T>[];
  events: TableEventHandlers<T>;
  loading: boolean;
  labels: TableLabels;
  config: {
    selectable: boolean;
    expandable: boolean;
    size: "sm" | "md" | "lg";
    variant: "default" | "striped" | "bordered";
  };
}

// ============================================================================
// Subcomponent Props Types
// ============================================================================

export interface TableHeaderProps<T extends BaseTableItem> {
  columns: TableColumn<T>[];
  selectable: boolean;
  onSelectAll: (checked: boolean) => void;
  allSelected: boolean;
  someSelected: boolean;
  onSort: (columnAccessor: TableColumnAccessor<T>) => void;
  currentSort: TableSorting;
  labels?: TableLabels;
}

export interface TableRowProps<T extends BaseTableItem> {
  item: T;
  index: number;
  columns: TableColumn<T>[];
  isSelected: boolean;
  isLoading: boolean;
  isExpanded: boolean;
  selectable: boolean;
  expandable: boolean;
  onToggleSelect: (itemId: string, checked: boolean) => void;
  onRowClick?: (item: T) => void;
  onRowDoubleClick?: (item: T) => void;
  onToggleExpand?: (item: T) => void;
  disabledCheckbox?: (item: T) => boolean;
  actions?: TableAction<T>[];
  labels?: TableLabels;
}

export interface TableCellProps<T extends BaseTableItem> {
  item: T;
  column: TableColumn<T>;
  isLoading: boolean;
  value: unknown;
}

export interface TableActionsProps<T extends BaseTableItem> {
  item: T;
  actions: TableAction<T>[];
  isLoading: boolean;
  labels?: TableLabels;
}

export interface TablePaginationProps {
  pagination: TablePagination;
  loading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  labels?: TableLabels;
}

export interface TableEmptyStateProps {
  message: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  labels?: TableLabels;
}

export interface TableLoadingStateProps {
  columns: number;
  rows: number;
  message?: string;
}

export interface TableColgroupProps<T extends BaseTableItem> {
  columns: TableColumn<T>[];
  selectable: boolean;
  hasActions: boolean;
}

export interface TableLoadingSkeletonProps<T extends BaseTableItem> {
  columns: TableColumn<T>[];
  rows?: number;
  selectable?: boolean;
  hasActions?: boolean;
}
