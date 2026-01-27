import { Permissions } from "@repo/redux/hooks";

import { FileStatus } from "./enums";

// Interfaces base para o sistema de upload
export interface IFile {
  id: string;
  file: string;
  name?: string | null;
  vector?: boolean | null;
  vector_error?: string | null;
  company_id: string;
  logs?: any[];
}

export interface IUploadFile {
  // Identificador local estável (para itens ainda não persistidos)
  localId?: string;
  file?: File;
  name: string;
  preview: string;
  progress?: number;
  status: FileStatus;
  id?: string;
  company_id: string;
  error?: string;
  vector?: boolean | null;
  vector_error?: string | null;
  idx?: number;
  logs?: any[];
}

export interface IUploadState {
  uploads: IUploadFile[];
  loading: boolean;
  dirty: boolean;
}

export interface IUploadConfig {
  maxHeight: string;
  path: string;
  canDelete?: boolean;
  disabled?: boolean;
  permissions: Permissions;
}

export interface IRenameProps {
  item?: IUploadFile;
  index?: number;
  open?: boolean;
}

// Interface para serviço de upload (SRP)
export interface IFileUploadService {
  upload(file: File, metadata: any): Promise<{ id: string; name: string; file: string }>;
  remove(id: string): Promise<void>;
  rename(id: string, name: string): Promise<void>;
  vectorize(file: string, feature: string): Promise<void>;
  destroyVectorize(file: string, feature: string): Promise<void>;
}

// Interface para gerenciamento de estado (SRP)
export interface IFileStateManager {
  getState(): IUploadState;
  setState(state: Partial<IUploadState>): void;
  addFile(file: IUploadFile): void;
  removeFile(id: string): void;
  updateFile(id: string, updates: Partial<IUploadFile>): void;
  clearState(): void;
}

// Interface para busca de arquivos (SRP)
export interface IFileSearchService {
  search(files: IUploadFile[], query: string): IUploadFile[];
  filterByStatus(files: IUploadFile[], status: IUploadFile["status"]): IUploadFile[];
  filterByVectorStatus(files: IUploadFile[], vectorStatus: boolean | null): IUploadFile[];
  sortByName(files: IUploadFile[], ascending?: boolean): IUploadFile[];
  sortByDate(files: IUploadFile[], ascending?: boolean): IUploadFile[];
}

// Interface para validação de arquivos (SRP)
export interface IFileValidator {
  validateFile(file: File): { isValid: boolean; error?: string };
  validateFiles(files: File[]): { valid: File[]; invalid: { file: File; error: string }[] };
}

// Interface para configuração de busca
export interface ISearchConfig {
  placeholder: string;
  debounceMs?: number;
}

// Interface para props do template principal
export interface IUploadTemplateProps<T extends IFile> {
  files?: T[];
  rootData: any;
  hookReq?: (data: any) => any;
  feature: string;
  handleState?: (state: Partial<IUploadState>) => void;
  permissions: Permissions;
  maxHeight?: string;
}
