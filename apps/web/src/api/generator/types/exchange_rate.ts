export interface exchange_rate {
  id: string;
  from_currency: string;
  to_currency: string;
  rate: number;
  date: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface exchange_rateCreateInput {
  id?: string;
  from_currency: string;
  to_currency: string;
  rate: number;
  date: string;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type exchange_rateUpdateInput = Partial<exchange_rateCreateInput>;

