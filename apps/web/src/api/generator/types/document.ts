import { document_chunk, document_chunkCreateInput } from "./document_chunk";
import { company, companyCreateInput } from "./company";

export interface document {
  id: string;
  file_name: string;
  original_name: string;
  r2_object_key: string;
  uploaded_at: string;
  company_id: string | null;
  category: string | null;
  chunks?: document_chunk[];
  bucket: string;
  company?: company;
}

export interface documentCreateInput {
  id?: string;
  file_name: string;
  original_name: string;
  r2_object_key: string;
  uploaded_at?: string;
  company_id?: string | null;
  category?: string | null;
  chunks?: document_chunkCreateInput[];
  bucket: string;
  company?: companyCreateInput;
}

export type documentUpdateInput = Partial<documentCreateInput>;

