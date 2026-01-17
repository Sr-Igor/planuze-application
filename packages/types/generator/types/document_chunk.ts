import { document, documentCreateInput } from "./document";

export interface document_chunk {
  id: string;
  document_id: string;
  chunk_text: string;
  document?: document;
}

export interface document_chunkCreateInput {
  id?: string;
  document_id?: string;
  chunk_text: string;
  document?: documentCreateInput;
}

export type document_chunkUpdateInput = Partial<document_chunkCreateInput>;

