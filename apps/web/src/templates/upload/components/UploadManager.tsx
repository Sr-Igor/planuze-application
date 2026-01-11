'use client';

import { memo, useCallback, useState } from 'react';

import { useFileSearch } from '../hooks/useFileSearch';
import { FileStatus } from '../types/enums';
import { IRenameProps, IUploadConfig, IUploadFile } from '../types/interfaces';
import { AddFileButton } from './AddFileButton';
import { FileList } from './FileList';
import { FileSearch } from './FileSearch';
import { RenameDialog } from './RenameDialog';

interface UploadManagerProps {
    uploads: IUploadFile[];
    setUploads: React.Dispatch<React.SetStateAction<IUploadFile[]>>;
    config: IUploadConfig;
    onUpload: (upload: IUploadFile, index: number) => void;
    onRemove: (upload: IUploadFile, index: number) => void;
    onRename: (file: { id: string; name: string }, index: number) => void;
    onVectorize?: (file: string, index: number) => void;
    onDestroyVectorize?: (file: string, index: number) => void;
    onRetry?: (upload: IUploadFile, index: number) => void;
    onLogs?: (item: IUploadFile) => void;
    loadingLines?: (string | undefined)[];
    maxFileSize?: number;
    allowedTypes?: string[];
}

export const UploadManager = memo(
    ({
        uploads,
        setUploads,
        config,
        onUpload,
        onRemove,
        onRename,
        onVectorize,
        onDestroyVectorize,
        onRetry,
        onLogs,
        loadingLines = [],
        maxFileSize,
        allowedTypes
    }: UploadManagerProps) => {
        const [rename, setRename] = useState<IRenameProps | undefined>(undefined);

        const { searchQuery, setSearchQuery, filteredFiles } = useFileSearch({
            files: uploads,
            config: { debounceMs: 300 }
        });

        const handleDrop = useCallback(
            (acceptedFiles: File[]) => {
                // Evitar duplicações: gerar um localId único por arquivo
                setUploads((prev) => {
                    const existingKeys = new Set(
                        prev.map((u) => `${u.name}|${u.file instanceof File ? u.file.size : u.preview}|${u.id ?? ''}`)
                    );

                    const newOnes: IUploadFile[] = acceptedFiles
                        .filter((file) => {
                            const key = `${file.name}|${file.size}|`;
                            return !existingKeys.has(key);
                        })
                        .map((file) => ({
                            localId: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
                            file,
                            preview: URL.createObjectURL(file),
                            progress: 0,
                            status: FileStatus.WAIT,
                            name: file.name,
                            company_id: ''
                        }));

                    return [...newOnes, ...prev];
                });
            },
            [setUploads]
        );

        const handleRename = useCallback((props: Partial<IRenameProps>) => {
            setRename((prev) => ({ ...prev, ...props }));
        }, []);

        const handleCloseRename = useCallback(() => {
            handleRename({ open: false });
        }, [handleRename]);

        return (
            <div className='space-y-4'>
                {/* Header com botão de adicionar e busca */}
                <div className='flex items-center justify-between gap-4'>
                    <div className='max-w-md flex-1'>
                        <FileSearch value={searchQuery} onChange={setSearchQuery} />
                    </div>

                    <AddFileButton
                        onDrop={handleDrop}
                        disabled={config.disabled}
                        maxFileSize={maxFileSize}
                        allowedTypes={allowedTypes}
                        size='sm'
                    />
                </div>

                {/* File List */}
                <FileList
                    files={filteredFiles}
                    maxHeight={config.maxHeight}
                    onRemove={onRemove}
                    onRename={onRename}
                    onVectorize={onVectorize}
                    onDestroyVectorize={onDestroyVectorize}
                    onRetry={onRetry}
                    onLogs={onLogs}
                    canDelete={config.canDelete}
                    path={config.path}
                    loadingLines={loadingLines}
                    rename={rename}
                    setRename={handleRename}
                    config={config}
                />

                {/* Rename Dialog */}
                <RenameDialog
                    rename={rename}
                    onRename={onRename}
                    onClose={handleCloseRename}
                    disabled={config.disabled}
                />
            </div>
        );
    }
);

UploadManager.displayName = 'UploadManager';
