export interface Pagination<T> {
  data: T[];
  page: number;
  pages: number;
  count: number;
}

export type { PaginationParams } from "@/hooks/search-params/utils";

export interface Query {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  orderKey?: string;
  orderValue?: string;
}
