export interface Query {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  orderKey?: string;
  orderValue?: string;
}
