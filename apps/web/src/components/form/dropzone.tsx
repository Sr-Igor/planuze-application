'use client';

import { UploadManager } from '@/templates/upload/components/UploadManager';
import { IRenameProps, IUploadConfig, IUploadFile } from '@/templates/upload/types';

export interface IDropProps {
    uploads: IUploadFile[];
    setUploads: React.Dispatch<React.SetStateAction<IUploadFile[]>>;
    onUpload: (upload: IUploadFile, index: number) => void;
    onRename: (file: { id: string; name: string }, index: number) => void;
    onRemove: (upload: IUploadFile, index: number) => void;
    maxHeight: string;
    path: string;
    canDelete?: boolean;
    disabled?: boolean;
    vectorize?: (file: string, index: number) => void;
    destroyVectorize?: (file: string, index: number) => void;
    rename?: IRenameProps;
    setRename: React.Dispatch<React.SetStateAction<IRenameProps | undefined>>;
    loadingLines?: (string | undefined)[];
}

export function Drop({
    uploads,
    setUploads,
    onUpload,
    onRemove,
    maxHeight,
    path,
    canDelete = true,
    disabled = false,
    vectorize,
    destroyVectorize,
    onRename,
    rename,
    setRename,
    loadingLines
}: IDropProps) {
    const config: IUploadConfig = {
        maxHeight,
        path,
        canDelete,
        disabled,
        permissions: {
            store: !disabled,
            destroy: canDelete
        }
    };

    return (
        <UploadManager
            uploads={uploads}
            setUploads={setUploads}
            config={config}
            onUpload={onUpload}
            onRemove={onRemove}
            onRename={onRename}
            onVectorize={vectorize}
            onDestroyVectorize={destroyVectorize}
            loadingLines={loadingLines}
        />
    );
}
