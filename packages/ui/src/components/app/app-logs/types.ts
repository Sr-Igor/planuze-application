import { integration, user } from "@repo/api/generator/types";

export interface LogEntry {
  id: string;
  auth_api?: string | null;
  ref_id: string | null;
  auth_ref_api?: user | null;
  auth_integration?: string | null;
  auth_ref_integration?: integration | null;
  old: any | null;
  new: any | null;
  query: any | null;
  action: string;
  deleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;

}

export interface ILogsComparison<T> {
  logs?: LogEntry[];
  deleteKeys?: string[];
  conversor?: Partial<Record<keyof T, { label: string; value: string }[]>>;
  format?: Partial<Record<keyof T, (value: any, item: T) => any>>;
}

export interface FormattedValue {
  display: string;
  full: string;
  isHtml: boolean;
}

export interface DiffItem {
  field: string;
  oldValue: any;
  newValue: any;
}

export type LogAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "INDEX"
  | "SHOW"
  | "TRASH"
  | "RESTORE";
