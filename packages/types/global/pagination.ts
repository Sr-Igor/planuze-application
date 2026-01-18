export interface Pagination<T> {
  data: T[];
  page: number;
  pages: number;
  count: number;
}
