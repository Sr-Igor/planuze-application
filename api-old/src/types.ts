import { Pagination, Query } from "./@types";

export interface IUseCallerProps<T> {
  filters?: Query & Record<string, any>;
  trashFilters?: Query & Record<string, any>;
  id?: string | null;
  enabledIndex?: boolean;
  enabledShow?: boolean;
  enableTrash?: boolean;
  callbacks?: {
    store?: {
      onSuccess?: (data: T | Pagination<T>) => void;
      onError?: () => void;
    };
    update?: {
      onSuccess?: (data: T | Pagination<T>) => void;
      onError?: () => void;
    };
    upsert?: {
      onSuccess?: (data: T) => void;
      onError?: () => void;
    };
    destroy?: {
      onSuccess?: (data: T | Pagination<T>) => void;
      onError?: () => void;
    };
    many?: {
      onSuccess?: (data: T[] | Pagination<T>) => void;
      onError?: () => void;
    };
    restore?: {
      onSuccess?: (data: T | Pagination<T>) => void;
      onError?: () => void;
    };
  };
}
