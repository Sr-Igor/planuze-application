"use client";

import {
  AlertCircle,
  Download,
  Expand,
  History,
  LoaderCircle,
  MoreHorizontalIcon,
  PenLine,
  RefreshCw,
  Sparkles,
  Trash,
} from "lucide-react";
import { toast } from "sonner";

import { useLang } from "@repo/language/hook";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";

import { downloadFile } from "@repo/api/global/download";
import { cn } from "@/lib/utils";

import { FileStatus } from "../types/enums";
import { IRenameProps, IUploadConfig, IUploadFile } from "../types/interfaces";

interface FileCardMenuProps {
  file: IUploadFile;
  index: number;
  onRemove: (upload: IUploadFile, index: number) => void;
  onRename: (file: { id: string; name: string }, index: number) => void;
  onVectorize?: (file: string, index: number) => void;
  onDestroyVectorize?: (file: string, index: number) => void;
  onRetry?: (upload: IUploadFile, index: number) => void;
  onLogs?: (item: IUploadFile) => void;
  canDelete?: boolean;
  setRename: (props: Partial<IRenameProps>) => void;
  path: string;
  setIsPreviewOpen: (open: boolean) => void;
  setOpenMenu: (id: number | null) => void;
  openMenu: number | null;
  config: IUploadConfig;
}

export const FileCardMenu = ({
  file,
  index,
  onRemove,
  onRename,
  onVectorize,
  onDestroyVectorize,
  onRetry,
  onLogs,
  canDelete = true,
  setRename,
  path,
  setIsPreviewOpen,
  setOpenMenu,
  openMenu,
  config,
}: FileCardMenuProps) => {
  const t = useLang();

  const handleDownload = () => {
    if (file.preview) {
      const URL_BASE = process.env.NEXT_PUBLIC_FILE_URL!;
      downloadFile(
        file.company_id ? `${URL_BASE}/${file.company_id}/${path}/${file.preview}` : file.preview,
        file?.name || file.preview
      );
    } else {
      toast.error(t.helper("error_loading"));
    }
  };

  const handleExpand = () => {
    if (file.preview) {
      setIsPreviewOpen(true);
    } else {
      toast.error(t.helper("error_loading"));
    }
  };

  const handleLogs = () => {
    onLogs?.(file);
  };

  return (
    <>
      <DropdownMenu open={openMenu === file.idx} onOpenChange={() => setOpenMenu(null)}>
        <DropdownMenuTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu(file.idx!);
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={file.status !== FileStatus.DONE && file.status !== FileStatus.ERROR}
          >
            <MoreHorizontalIcon className="text-muted-foreground h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup className="*:data-[slot=dropdown-menu-item]:[&>svg]:text-muted-foreground">
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2"
              onClick={handleExpand}
            >
              <Expand /> {t.helper("expand")}
            </DropdownMenuItem>
            {config.permissions.update && (
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-2"
                onClick={() => setRename({ item: file, index, open: true })}
              >
                <PenLine /> {t.helper("rename")}
              </DropdownMenuItem>
            )}
            {file.logs && Array.isArray(file.logs) && file.logs.length > 0 && (
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-2"
                onClick={handleLogs}
              >
                <History /> {t.helper("logs")}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2"
              onClick={handleDownload}
            >
              <Download /> {t.helper("download")}
            </DropdownMenuItem>

            {/* Retry Action for Error Status */}
            {file.status === FileStatus.ERROR && onRetry && (
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-2 text-blue-500"
                onClick={() => onRetry(file, index)}
              >
                <RefreshCw className="text-blue-500" size={16} />
                {t.helper("retry") || "Tentar Novamente"}
              </DropdownMenuItem>
            )}

            {/* AI Actions */}
            {config.permissions.update && (
              <>
                {file.vector === false && !file.vector_error && (
                  <DropdownMenuItem
                    className={cn("flex cursor-pointer items-center gap-2 text-green-500")}
                    onClick={() => onVectorize?.(file.preview!, index)}
                  >
                    <Sparkles className="text-green-500" size={16} color="green" />
                    {t.helper("available_ia")}
                  </DropdownMenuItem>
                )}
              </>
            )}

            {config.permissions.destroy && (
              <>
                {file.vector && !file.vector_error && (
                  <DropdownMenuItem
                    className={cn("flex cursor-pointer items-center gap-2 text-orange-500")}
                    onClick={() => onDestroyVectorize?.(file.preview!, index)}
                  >
                    <Sparkles className="text-orange-500" size={16} color="orange" />
                    {t.helper("unavailable_ia")}
                  </DropdownMenuItem>
                )}
              </>
            )}

            {file.vector === null && !file.vector_error && (
              <DropdownMenuItem
                className={cn("flex cursor-pointer items-center gap-2 text-orange-500")}
                disabled
              >
                <LoaderCircle className="animate-spin text-orange-500" size={16} color="orange" />
                {t.helper("reading")}
              </DropdownMenuItem>
            )}

            {file.vector_error && (
              <DropdownMenuItem
                className={cn(
                  "mt-2 flex cursor-default items-center gap-2 px-2 text-sm text-red-500",
                  "hover:bg-transparent!"
                )}
              >
                <AlertCircle className="text-red-500" size={16} color="red" />
                <span className="text-red-500">{t.helper("invalid_ia")}</span>
              </DropdownMenuItem>
            )}

            {/* Delete Action */}
            {config.permissions.destroy && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => onRemove(file, index)}
                >
                  <Trash /> {t.helper("delete")}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
