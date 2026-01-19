"use client";

import { memo, useState } from "react";

import { Download, File } from "lucide-react";
import { toast } from "sonner";

import { useLang } from "@repo/language/hooks";
import { Button , Img } from "@repo/ui";
import { AppDialog } from "@repo/ui";

import { downloadFile } from "@repo/api/global/download";

import { IUploadFile } from "../types";

interface FilePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file?: IUploadFile;
  path: string;
}

export const FilePreviewModal = memo(
  ({ open, onOpenChange, file, path }: FilePreviewModalProps) => {
    const t = useLang();

    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const handleDownload = () => {
      if (downloadUrl) {
        downloadFile(downloadUrl, file?.name || file?.preview || "file");
      } else {
        toast.error(t.helper("error_loading"));
      }
    };

    if (!file) return null;

    return (
      <AppDialog
        open={open}
        onOpenChange={onOpenChange}
        title={
          <div className="flex items-center gap-2">
            <File className="h-5 w-5" />
            <span className="truncate">{file.name}</span>
          </div>
        }
        className="h-[90vh] max-h-[90vh]! w-[90vw] max-w-[90vw]!"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleDownload}
              disabled={!downloadUrl}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {t.helper("download")}
            </Button>
          </div>
        }
      >
        <div className="bg-muted relative aspect-video h-[100%] w-[100%] overflow-hidden rounded-lg">
          <Img
            src={file.preview}
            alt={file.file?.name || "file"}
            fill
            mimeType={file.file?.type}
            forceLoad={false}
            path={path}
            callbackLink={(link) => {
              setDownloadUrl(link);
            }}
            style={{ objectFit: "contain" }}
          />
        </div>
      </AppDialog>
    );
  }
);

FilePreviewModal.displayName = "FilePreviewModal";
