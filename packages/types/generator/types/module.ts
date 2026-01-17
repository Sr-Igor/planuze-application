import { company, companyCreateInput } from "./company";
import { feature, featureCreateInput } from "./feature";

export interface module {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  icon: string | null;
  order: number;
  company_id: string | null;
  basic: boolean;
  integration: boolean;
  company?: company;
  features?: feature[];
}

export interface moduleCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  icon?: string | null;
  order?: number;
  company_id?: string | null;
  basic?: boolean;
  integration?: boolean;
  company?: companyCreateInput;
  features?: featureCreateInput[];
}

export type moduleUpdateInput = Partial<moduleCreateInput>;

