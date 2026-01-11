import { company, companyCreateInput } from "./company";

export interface company_chunk {
  id: string;
  company_id: string;
  chunk_text: string;
  company?: company;
}

export interface company_chunkCreateInput {
  id?: string;
  company_id?: string;
  chunk_text: string;
  company?: companyCreateInput;
}

export type company_chunkUpdateInput = Partial<company_chunkCreateInput>;

