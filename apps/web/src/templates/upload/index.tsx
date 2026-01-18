"use client";

import { memo, useCallback, useState } from "react";

import { useLang } from "@repo/language/hooks";
import { AppLogsModal } from "@repo/ui/app";

import { useLogs } from "@/hooks/logs";
import { useUnload } from "@/hooks/unload";

import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";
import { UploadManager } from "./components/UploadManager";
import { useFileState } from "./hooks/useFileState";
import { useFileUpload } from "./hooks/useFileUpload";
import { useUploadQueue } from "./hooks/useUploadQueue";
import { IFile, IUploadFile, IUploadTemplateProps } from "./types/interfaces";

export const UploadTemplate = memo(
  <T extends IFile>({
    files,
    rootData,
    hookReq,
    feature,
    handleState,
    permissions,
    maxHeight = "calc(100vh - 420px)",
    maxFileSize,
    allowedTypes,
  }: IUploadTemplateProps<T> & {
    maxFileSize?: number;
    allowedTypes?: string[];
  }) => {
    const [exclude, setExclude] = useState<{ upload?: any; index?: number }>({});
    const [logsState, setLogsState] = useState<{ open: boolean; item?: IUploadFile }>({
      open: false,
    });

    const requests = hookReq?.(rootData);
    const t = useLang();
    const logsHook = useLogs();

    // Gerenciamento de estado dos uploads
    const {
      uploads,
      setUploads,
      loadingLines,
      setLoadingLines,
      isAnyUploading,
      addFiles,
      removeFile,
      updateFile,
    } = useFileState({
      files,
      onStateChange: useCallback(
        (state) => {
          // Só notificar mudanças importantes
          if (state.loading !== undefined || state.dirty !== undefined) {
            handleState?.(state);
          }
        },
        [handleState]
      ),
    });

    // Operações de upload
    const {
      handleUpload,
      handleRemove,
      handleRename,
      handleVectorize,
      handleDestroyVectorize,
      retryUpload,
    } = useFileUpload({
      requests,
      rootData,
      feature,
      onStateChange: useCallback((state) => handleState?.(state), [handleState]),
      setUploads,
      setLoadingLines,
    });

    // Fila de uploads
    useUploadQueue({
      uploads,
      onUpload: handleUpload,
      maxConcurrent: 1,
    });

    // Configuração do upload
    const config = {
      maxHeight,
      path: `${feature}/file`,
      canDelete: permissions.destroy,
      disabled: !permissions.store,
      permissions,
    };

    // Prevenção de saída durante operações
    useUnload(!!requests?.store?.isPending || !!requests?.destroy?.isPending, (dirty) =>
      handleState?.({ dirty })
    );

    // Handlers para o UploadManager
    const onUpload = useCallback(
      (upload: any, index: number) => {
        handleUpload(upload, index);
      },
      [handleUpload]
    );

    const onRemove = useCallback((upload: any, index: number) => {
      setExclude({ upload, index });
    }, []);

    const onRename = useCallback(
      (file: { id: string; name: string }, index: number) => {
        handleRename(file, index);
      },
      [handleRename]
    );

    const onVectorize = useCallback(
      (file: string, index: number) => {
        handleVectorize(file, index);
      },
      [handleVectorize]
    );

    const onDestroyVectorize = useCallback(
      (file: string, index: number) => {
        handleDestroyVectorize(file, index);
      },
      [handleDestroyVectorize]
    );

    const onRetry = useCallback(
      (upload: IUploadFile, index: number) => {
        retryUpload(upload, index);
      },
      [retryUpload]
    );

    // Handler para confirmação de exclusão
    const handleConfirmDelete = useCallback(() => {
      if (exclude.upload && exclude.index !== undefined) {
        handleRemove(exclude.upload, exclude.index);
      }
    }, [exclude, handleRemove]);

    // Handler para logs
    const handleLogs = useCallback((item: IUploadFile) => {
      setLogsState({ open: true, item });
    }, []);

    // Configuração de logs baseada no tipo de arquivo
    const getLogsConfig = useCallback(
      (item: IUploadFile) => {
        if (!item.id) return undefined;

        // Determinar o tipo de arquivo baseado no feature
        return logsHook?.[feature]?.();
      },
      [feature, logsHook]
    );

    return (
      <div className="overflow-hidden p-3 md:p-5">
        <UploadManager
          uploads={uploads}
          setUploads={setUploads}
          config={config}
          onUpload={onUpload}
          onRemove={onRemove}
          onRename={onRename}
          onVectorize={onVectorize}
          onDestroyVectorize={onDestroyVectorize}
          onRetry={onRetry}
          onLogs={handleLogs}
          loadingLines={loadingLines}
          maxFileSize={maxFileSize}
          allowedTypes={allowedTypes}
        />

        <DeleteConfirmationDialog
          file={exclude.upload}
          index={exclude.index}
          open={!!exclude.upload}
          onOpenChange={() => setExclude({})}
          onConfirm={handleConfirmDelete}
        />

        {/* Modal de Logs */}
        {logsState.item && (
          <AppLogsModal
            open={logsState.open}
            onOpenChange={(open) => setLogsState({ open, item: open ? logsState.item : undefined })}
            data={logsState.item}
            logs={getLogsConfig(logsState.item)}
          />
        )}
      </div>
    );
  }
);

UploadTemplate.displayName = "UploadTemplate";
