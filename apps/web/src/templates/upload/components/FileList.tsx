"use client";

import { useLang } from "@repo/language/hooks";

import { IRenameProps, IUploadConfig, IUploadFile } from "../types/interfaces";
import { PaginatedFileList } from "./PaginatedFileList";

interface FileListProps {
  files: IUploadFile[];
  maxHeight: string;
  onRemove: (upload: IUploadFile, index: number) => void;
  onRename: (file: { id: string; name: string }, index: number) => void;
  onVectorize?: (file: string, index: number) => void;
  onDestroyVectorize?: (file: string, index: number) => void;
  onRetry?: (upload: IUploadFile, index: number) => void;
  onLogs?: (item: IUploadFile) => void;
  canDelete?: boolean;
  path: string;
  loadingLines?: (string | undefined)[];
  rename?: IRenameProps;
  setRename: (props: Partial<IRenameProps>) => void;
  usePagination?: boolean;
  paginationThreshold?: number;
  config: IUploadConfig;
}

export const FileList = ({
  files,
  maxHeight,
  onRemove,
  onRename,
  onVectorize,
  onDestroyVectorize,
  onRetry,
  onLogs,
  canDelete = true,
  path,
  loadingLines = [],
  rename,
  setRename,
  config,
}: FileListProps) => {
  const t = useLang();

  return (
    <PaginatedFileList
      files={files}
      maxHeight={maxHeight}
      config={config}
      onRemove={onRemove}
      onRename={onRename}
      onVectorize={onVectorize}
      onDestroyVectorize={onDestroyVectorize}
      onRetry={onRetry}
      onLogs={onLogs}
      canDelete={canDelete}
      path={path}
      loadingLines={loadingLines}
      rename={rename}
      setRename={setRename}
      itemsPerPage={12}
    />
  );
};
