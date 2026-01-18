"use client";

import { memo, useCallback } from "react";

import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { useLang } from "@repo/language/hooks";
import { AppDialog } from "@repo/ui-new";

import { cn } from "@repo/ui-new";

import { useFileValidation } from "../hooks/useFileValidation";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDrop: (files: File[]) => void;
  disabled?: boolean;
  maxFileSize?: number;
  allowedTypes?: string[];
}

export const UploadModal = memo(
  ({
    open,
    onOpenChange,
    onDrop,
    disabled = false,
    maxFileSize,
    allowedTypes,
  }: UploadModalProps) => {
    const t = useLang();
    const { validateFiles } = useFileValidation({ maxFileSize, allowedTypes });

    const handleDrop = useCallback(
      (acceptedFiles: File[]) => {
        if (disabled) return;

        // Validar arquivos antes de processar
        const { valid, invalid } = validateFiles(acceptedFiles);

        if (invalid.length > 0) {
          console.warn("Arquivos inválidos:", invalid);
          // Aqui você pode mostrar um toast ou notificação
        }

        if (valid.length > 0) {
          onDrop(valid);
          onOpenChange(false); // Fechar modal após adicionar arquivos
        }
      },
      [onDrop, disabled, validateFiles, onOpenChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      // Important: onDrop deve processar uma única vez. Desabilitar keyboard e click extras evita disparos duplos em alguns browsers
      onDrop: handleDrop,
      multiple: true,
      disabled,
      accept: allowedTypes?.length
        ? Object.fromEntries(allowedTypes.map((type) => [type, []]))
        : undefined,
    });

    return (
      <AppDialog
        open={open}
        onOpenChange={onOpenChange}
        title={t.helper("add_files")}
        description={t.helper("add_files_description")}
        className="min-h-[80vh] w-[95vw] max-w-2xl min-w-[80vw]"
      >
        <div className="h-full min-h-[calc(80vh-100px)] space-y-4">
          <div
            {...getRootProps()}
            className={cn(
              `h-full w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center`,
              "flex items-center justify-center transition-all duration-400 ease-in-out",
              isDragActive ? "bg-muted border-primary" : "hover:border-primary/50",
              disabled ? "cursor-not-allowed opacity-50" : ""
            )}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-4">
                <Upload size={60} className="text-primary" />
                <p className="text-lg font-medium">{t.helper("drop_here")}</p>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <Upload size={60} className="text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">{t.helper("drag_and_drop")}</p>
                  <p className="text-muted-foreground text-sm">{t.helper("or_click_to_select")}</p>
                </div>
              </div>
            )}
          </div>

          {/* Informações sobre tipos e tamanhos permitidos */}
          <div className="text-muted-foreground space-y-1 text-xs">
            {maxFileSize && (
              <p>
                {t.helper("max_file_size")}: {formatFileSize(maxFileSize)}
              </p>
            )}
            {allowedTypes && allowedTypes.length > 0 && (
              <p>
                {t.helper("allowed_types")}: {allowedTypes.join(", ")}
              </p>
            )}
          </div>
        </div>
      </AppDialog>
    );
  }
);

UploadModal.displayName = "UploadModal";

// Função auxiliar para formatar tamanho de arquivo
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
