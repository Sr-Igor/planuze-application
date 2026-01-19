/**
 * Types for AppLogs module
 */

export interface LogEntryUser {
  id?: string;
  name: string;
  email?: string;
}

export interface LogEntryIntegration {
  id?: string;
  name: string;
}

export interface LogEntry {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * API auth reference ID
   */
  auth_api?: string | null;
  /**
   * Reference ID
   */
  ref_id: string | null;
  /**
   * User who performed the action
   */
  auth_ref_api?: LogEntryUser | null;
  /**
   * Integration auth reference ID
   */
  auth_integration?: string | null;
  /**
   * Integration that performed the action
   */
  auth_ref_integration?: LogEntryIntegration | null;
  /**
   * Old value (JSON string)
   */
  old: string | null;
  /**
   * New value (JSON string)
   */
  new: string | null;
  /**
   * Query parameters (JSON string)
   */
  query: string | null;
  /**
   * Action type
   */
  action: string;
  /**
   * Whether the record is deleted
   */
  deleted: boolean;
  /**
   * Deletion timestamp
   */
  deletedAt: string | null;
  /**
   * Creation timestamp
   */
  createdAt: string;
  /**
   * Update timestamp
   */
  updatedAt: string;
}

export interface LogsComparisonProps<T> {
  /**
   * Log entries to display
   */
  logs?: LogEntry[];
  /**
   * Keys to exclude from comparison
   */
  deleteKeys?: string[];
  /**
   * Value converters for specific keys
   */
  conversor?: Partial<Record<keyof T, { label: string; value: string }[]>>;
  /**
   * Custom formatters for specific keys
   */
  format?: Partial<Record<keyof T, (value: unknown, item: T) => unknown>>;
  /**
   * Labels for the component
   */
  labels?: LogsLabels;
  /**
   * Date locale for formatting
   */
  dateLocale?: string;
}

export interface LogsLabels {
  /**
   * Label for true boolean values
   */
  true: string;
  /**
   * Label for false boolean values
   */
  false: string;
  /**
   * Label for empty values
   */
  empty: string;
  /**
   * Label for empty data state
   */
  emptyData: string;
  /**
   * Label for nothing action state
   */
  nothingAction: string;
  /**
   * Label for field column
   */
  field: string;
  /**
   * Label for old value column
   */
  old: string;
  /**
   * Label for new value column
   */
  new: string;
  /**
   * Label for date
   */
  date: string;
  /**
   * Label for responsible
   */
  responsible: string;
  /**
   * Label for integration
   */
  integration: string;
  /**
   * Label for copied toast
   */
  copied: string;
  /**
   * Label for logs title
   */
  logs: string;
  /**
   * Function to get property label
   */
  property: (key: string) => string;
  /**
   * Function to get log action label
   */
  logAction: (action: string) => string;
}

export interface FormattedValue {
  display: string;
  full: string;
  isHtml: boolean;
}

export interface DiffItem {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export type LogAction = "CREATE" | "UPDATE" | "DELETE" | "INDEX" | "SHOW" | "TRASH" | "RESTORE";
