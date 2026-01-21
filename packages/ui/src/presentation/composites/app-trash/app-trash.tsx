"use client";

import { useMemo } from "react";

import { isDate } from "date-fns";
import { LoaderCircle, PackageOpen } from "lucide-react";

import { cn } from "../../../shared/utils";
import { Skeleton } from "../../primitives/skeleton";
import { AppTableActions } from "../app-table";
import type { TableAction } from "../app-table";

export interface TrashLabels {
  /**
   * Label for true boolean values
   */
  true: string;
  /**
   * Label for false boolean values
   */
  false: string;
  /**
   * Label for actions column
   */
  actions: string;
  /**
   * Label for empty state
   */
  empty: string;
  /**
   * Function to get property label
   */
  property: (key: string) => string;
}

const defaultLabels: TrashLabels = {
  true: "Yes",
  false: "No",
  actions: "Actions",
  empty: "No items",
  property: (key: string) => key,
};

export interface AppTrashProps<T extends { id: string }> {
  /**
   * Items to display
   */
  items: T[];
  /**
   * Actions available for each item
   */
  actions?: TableAction<T & { id: string }>[];
  /**
   * Keys to show (defaults to all keys)
   */
  showKeys?: (keyof T)[];
  /**
   * Value converters for specific keys
   */
  conversor?: Partial<Record<keyof T, { label: string; value: string }[]>>;
  /**
   * Custom formatters for specific keys
   */
  format?: Partial<Record<keyof T, (value: unknown, item: T) => unknown>>;
  /**
   * Whether the component is loading
   */
  loading?: boolean;
  /**
   * Labels for the component
   */
  labels?: TrashLabels;
  /**
   * Date locale for formatting
   */
  dateLocale?: string;
}

export const AppTrash = <T extends { id: string }>({
  items,
  actions = [],
  showKeys,
  conversor,
  format,
  loading,
  labels = defaultLabels,
  dateLocale = "pt-BR",
}: AppTrashProps<T>) => {
  /* ------------------------------------------------------------------ */
  /* which columns to show -------------------------------------------- */
  const allKeys = useMemo(() => {
    if (!items.length) return [];
    const keys = Object.keys(items[0]) as (keyof T)[];
    if (showKeys?.length) {
      return showKeys.filter((k) => keys.includes(k));
    }

    return keys;
  }, [items, showKeys]);
  /* ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------ */
  /* prepare value for display ---------------------------------------- */

  const applyFormat = (field: keyof T, value: unknown, item: T): unknown => {
    if (!format?.[field]) return value;
    try {
      return format[field](value, item);
    } catch {
      return value;
    }
  };

  const applyConversor = (field: keyof T, value: unknown): unknown => {
    if (!conversor?.[field] || value == null) return value;
    const opts = conversor[field];
    const mapOne = (x: unknown) => opts.find((o) => String(o.value) === String(x))?.label ?? x;
    return Array.isArray(value) ? opts.length && value.map(mapOne).join(", ") : mapOne(value);
  };

  const stringify = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "bigint") return value.toString();
    if (typeof value === "symbol") return value.toString();
    return JSON.stringify(value);
  };

  const prepareDisplay = (field: keyof T, raw: unknown, item: T): string => {
    let v = applyFormat(field, raw, item);
    v = applyConversor(field, v);

    if (typeof v === "boolean") return v ? labels.true : labels.false;
    if (v === null || v === undefined) return "—";
    if (isDate(v)) return new Date(v).toLocaleString(dateLocale);
    if (typeof v === "object") return JSON.stringify(v);

    return stringify(v);
  };
  /* ------------------------------------------------------------------ */

  return (
    <>
      {loading && (
        <Skeleton className="absolute h-full w-full">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              loading ? "" : "hidden"
            )}
          >
            <LoaderCircle className="animate-spin" size={20} />
          </div>
        </Skeleton>
      )}

      {!!items.length && (
        <>
          {/* Mobile: Cards */}
          <div
            className={cn(
              "block space-y-3 p-2 transition-opacity duration-300 md:hidden",
              loading ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            {items.map((item, idx) => (
              <div
                key={`card-${idx}-${String(item.id)}`}
                className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-neutral-50 p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80"
              >
                {allKeys.map((key) => (
                  <div key={String(key)} className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold text-gray-700 capitalize dark:text-gray-200">
                      {labels.property(String(key))}
                    </span>
                    <span className="text-[12px] break-all text-gray-800 dark:text-gray-100">
                      {prepareDisplay(key, item[key], item)}
                    </span>
                  </div>
                ))}
                {actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 border-t border-gray-100 pt-2 dark:border-neutral-800">
                    <AppTableActions<T & { id: string }>
                      actions={actions}
                      item={item as T & { id: string }}
                      isLoading={false}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Table */}
          <div
            className={cn(
              "hidden p-3 transition-opacity duration-300 md:block",
              loading ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            <table className="min-w-full divide-y divide-gray-500 text-sm">
              <thead>
                <tr>
                  {allKeys.map((key) => (
                    <th key={String(key)} className="px-4 py-2 text-left font-medium capitalize">
                      {labels.property(String(key))}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th className="px-4 py-2 text-center font-medium">{labels.actions}</th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-400">
                {items.map((item, idx) => (
                  <tr key={`row-${idx}-${String(item.id)}`}>
                    {allKeys.map((key) => (
                      <td key={String(key)} className="px-4 py-2 capitalize">
                        {prepareDisplay(key, item[key], item)}
                      </td>
                    ))}

                    {actions.length > 0 && (
                      <td className="space-x-2 px-4 py-2 text-center">
                        <AppTableActions<T & { id: string }>
                          actions={actions}
                          item={item as T & { id: string }}
                          isLoading={false}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {items.length === 0 && !loading && (
        <div className="absolute flex h-full w-full flex-col items-center justify-center">
          <PackageOpen size={60} className="text-muted-foreground" />
          <div className="text-md text-center font-semibold text-gray-400 dark:text-gray-500">
            {labels.empty}
          </div>
        </div>
      )}
    </>
  );
};

AppTrash.displayName = "AppTrash";
