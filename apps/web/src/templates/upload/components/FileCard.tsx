'use client';

import { useState } from 'react';

import { FileStatus } from '../types/enums';
import { IRenameProps, IUploadConfig, IUploadFile } from '../types/interfaces';
import { FileCardMenu } from './FileCardMenu';
import { FilePreviewModal } from './FilePreviewModal';
import { AlertCircle, CheckCircle, Clock, LoaderCircle } from 'lucide-react';

interface FileCardProps {
    file: IUploadFile;
    index: number;
    onRemove: (upload: IUploadFile, index: number) => void;
    onRename: (file: { id: string; name: string }, index: number) => void;
    onVectorize?: (file: string, index: number) => void;
    onDestroyVectorize?: (file: string, index: number) => void;
    onRetry?: (upload: IUploadFile, index: number) => void;
    onLogs?: (item: IUploadFile) => void;
    canDelete?: boolean;
    path: string;
    setRename: (props: Partial<IRenameProps>) => void;
    setOpenMenu: (id: number | null) => void;
    openMenu: number | null;
    config: IUploadConfig;
}

export const FileCard = ({
    file,
    index,
    onRemove,
    onRename,
    onVectorize,
    onDestroyVectorize,
    onRetry,
    onLogs,
    canDelete = true,
    path,
    setRename,
    setOpenMenu,
    openMenu,
    config
}: FileCardProps) => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const getStatusIcon = () => {
        switch (file.status) {
            case FileStatus.DONE:
                return <CheckCircle className='h-4 w-4 text-green-500' />;
            case FileStatus.UPLOADING:
            case FileStatus.WAIT:
                return <LoaderCircle className='h-4 w-4 animate-spin text-blue-500' />;
            case FileStatus.ERROR:
            case FileStatus.ERROR_LOADING:
                return <AlertCircle className='h-4 w-4 text-red-500' />;
            case FileStatus.REMOVE:
                return <Clock className='h-4 w-4 text-orange-500' />;
            default:
                return <Clock className='h-4 w-4 text-gray-500' />;
        }
    };

    return (
        <>
            <div
                className='hover:bg-muted/50 flex cursor-pointer items-center gap-1 border-b px-3 py-2 transition-colors first:border-t'
                role='button'
                onClick={() => setIsPreviewOpen(true)}>
                {/* Informações do arquivo */}
                <div className='min-w-0 flex-1'>
                    <div className='mb-1 flex items-center gap-2'>
                        {getStatusIcon()}
                        <h3 className='max-w-[180px] truncate text-sm font-medium md:max-w-[300px] lg:max-w-none'>
                            {file.name}
                        </h3>
                    </div>

                    {file.error && <p className='mt-1 truncate text-xs text-red-500'>{file.error}</p>}
                </div>

                {/* Menu de ações */}
                <div className='flex-shrink-0'>
                    <FileCardMenu
                        file={file}
                        index={index}
                        config={config}
                        onRemove={onRemove}
                        onRename={onRename}
                        onVectorize={onVectorize}
                        onDestroyVectorize={onDestroyVectorize}
                        onRetry={onRetry}
                        onLogs={onLogs}
                        canDelete={canDelete}
                        setRename={setRename}
                        path={path}
                        setIsPreviewOpen={setIsPreviewOpen}
                        setOpenMenu={setOpenMenu}
                        openMenu={openMenu}
                    />
                </div>
            </div>
            {/* Modal de preview */}
            <FilePreviewModal open={isPreviewOpen} onOpenChange={setIsPreviewOpen} file={file} path={path} />
        </>
    );
};
