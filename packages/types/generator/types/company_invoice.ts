import { company, companyCreateInput } from "./company";

export interface company_invoice {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  value: number;
  success: boolean;
  last_digits: string | null;
  metadata: any | null;
  flag_card: string | null;
  currency: string | null;
  title: string | null;
  status: string | null;
  description: string | null;
  gateway: string | null;
  gateway_id: string | null;
  gateway_date: string | null;
  company?: company;
}

export interface company_invoiceCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  value: number;
  success: boolean;
  last_digits?: string | null;
  metadata?: any | null;
  flag_card?: string | null;
  currency?: string | null;
  title?: string | null;
  status?: string | null;
  description?: string | null;
  gateway?: string | null;
  gateway_id?: string | null;
  gateway_date?: string | null;
  company?: companyCreateInput;
}

export type company_invoiceUpdateInput = Partial<company_invoiceCreateInput>;

