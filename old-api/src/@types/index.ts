export interface Pagination<T> {
  data: T[];
  page: number;
  pages: number;
  count: number;
}

export interface Query {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  orderKey?: string;
  orderValue?: string;
}
