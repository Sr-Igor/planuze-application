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
  format?: Partial<Record<keyof T, (value: any, item: T) => unknown>>;
  /**
   * Date locale for formatting
   */
  dateLocale?: string;
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
