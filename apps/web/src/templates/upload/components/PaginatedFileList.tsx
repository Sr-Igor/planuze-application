"use client";

import { useMemo, useState } from "react";

import { ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, ScrollArea } from "@repo/ui";

import { IRenameProps, IUploadConfig, IUploadFile } from "../types/interfaces";
import { FileCard } from "./FileCard";

interface PaginatedFileListProps {
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
  itemsPerPage?: number;
  config: IUploadConfig;
}

export const PaginatedFileList = ({
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
  itemsPerPage = 12,
  config,
}: PaginatedFileListProps) => {
  const t = useLang();
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // Calcular paginação
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(files.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFiles = files.slice(startIndex, endIndex);

    return {
      totalPages,
      currentPage,
      startIndex,
      endIndex,
      currentFiles,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [files, currentPage, itemsPerPage]);

  // Reset para primeira página quando files mudam
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const calcHeight = useMemo(() => {
    return `calc(${maxHeight} - 90px)`;
  }, [maxHeight]);

  return (
    <div className="space-y-4">
      {/* Lista de arquivos */}
      <ScrollArea style={{ height: calcHeight, overflowY: "auto", position: "relative" }}>
        {files.length === 0 && (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 p-5"
            style={{ minHeight: calcHeight }}
          >
            <PackageOpen size={60} className="text-muted-foreground" />
            <p className="text-muted-foreground text-md text-center font-semibold">
              {t.helper("no_files")}
            </p>
          </div>
        )}

        {files.length > 0 && (
          <div className="flex flex-col gap-0" style={{ minHeight: calcHeight }}>
            {pagination.currentFiles.map((file, index) => (
              <FileCard
                key={file.id ?? file.localId ?? `upload-${pagination.startIndex + index}`}
                file={file}
                config={config}
                index={pagination.startIndex + index}
                onRemove={onRemove}
                onRename={onRename}
                onVectorize={onVectorize}
                onDestroyVectorize={onDestroyVectorize}
                onRetry={onRetry}
                onLogs={onLogs}
                canDelete={canDelete}
                path={path}
                setRename={setRename}
                setOpenMenu={setOpenMenu}
                openMenu={openMenu}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Paginação */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-muted-foreground hidden text-sm md:block">
            {t.helper("showing")} {pagination.startIndex + 1}-
            {Math.min(pagination.endIndex, files.length)} {t.helper("of")} {files.length}{" "}
            {t.helper("files")}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="h-8 w-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
