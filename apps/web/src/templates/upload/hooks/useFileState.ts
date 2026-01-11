import { useCallback, useEffect, useRef, useState } from 'react';

import { FileStateService } from '../services/FileStateService';
import { FileStatus } from '../types/enums';
import { IFile, IUploadFile, IUploadState } from '../types/interfaces';

export interface UseFileStateProps {
    files?: IFile[];
    onStateChange: (state: Partial<IUploadState>) => void;
}

export interface UseFileStateReturn {
    uploads: IUploadFile[];
    setUploads: React.Dispatch<React.SetStateAction<IUploadFile[]>>;
    loadingLines: string[];
    setLoadingLines: React.Dispatch<React.SetStateAction<string[]>>;
    isAnyUploading: boolean;
    addFiles: (files: File[]) => void;
    removeFile: (id: string) => void;
    updateFile: (id: string, updates: Partial<IUploadFile>) => void;
}

export const useFileState = ({ files, onStateChange }: UseFileStateProps): UseFileStateReturn => {
    const [uploads, setUploads] = useState<IUploadFile[]>([]);
    const [loadingLines, setLoadingLines] = useState<string[]>([]);
    const stateServiceRef = useRef<FileStateService | null>(null);
    const lastFilesRef = useRef<string>('');

    // Inicializar serviço apenas uma vez
    if (!stateServiceRef.current) {
        stateServiceRef.current = new FileStateService();
    }

    const isAnyUploading = uploads.some((u) => u.status === FileStatus.UPLOADING);

    // Sincronizar com files externos
    useEffect(() => {
        if (!files) {
            setUploads([]);
            lastFilesRef.current = '';
            return;
        }

        // Criar hash dos files para verificar se realmente mudaram
        const filesHash = JSON.stringify(files.map((f) => ({ id: f.id, file: f.file, name: f.name })));

        if (filesHash === lastFilesRef.current) {
            return; // Files não mudaram, não precisa sincronizar
        }

        lastFilesRef.current = filesHash;

        setUploads((currentUploads) => {
            // Criar mapa de files por ID
            const filesMap = new Map(
                files.map((file, idx) => [
                    file.id,
                    {
                        preview: file.file,
                        status: FileStatus.DONE as const,
                        vector: file?.vector,
                        company_id: file.company_id,
                        vector_error: file?.vector_error,
                        name: file?.name || '-',
                        id: file.id,
                        idx,
                        logs: file?.logs
                    }
                ])
            );

            // Preservar itens em processamento (wait, uploading, error, etc.)
            const processingItems = currentUploads.filter((upload) => {
                // Manter itens que não estão 'done'
                if (upload.status !== FileStatus.DONE) {
                    return true;
                }
                // Manter itens 'done' que não estão mais em files (foram removidos)
                return !filesMap.has(upload.id!);
            });

            // Atualizar logs dos itens existentes que estão em processamento
            const updatedProcessingItems = processingItems.map((upload) => {
                if (upload.status === FileStatus.DONE && filesMap.has(upload.id!)) {
                    const fileData = filesMap.get(upload.id!);
                    return {
                        ...upload,
                        logs: fileData?.logs || upload.logs
                    };
                }
                return upload;
            });

            // Combinar files com itens em processamento
            const newUploads = [...Array.from(filesMap.values()), ...updatedProcessingItems];

            return newUploads;
        });
    }, [files]);

    // Notificar mudanças de estado
    useEffect(() => {
        const unsubscribe = stateServiceRef.current!.subscribe((state) => {
            onStateChange(state);
        });

        return unsubscribe;
    }, [onStateChange]);

    const addFiles = useCallback((files: File[]) => {
        const newUploads: IUploadFile[] = files.map((file) => ({
            localId: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
            file,
            preview: URL.createObjectURL(file),
            progress: 0,
            status: FileStatus.WAIT,
            name: file.name,
            company_id: ''
        }));

        setUploads((prev) => [...newUploads, ...prev]);
    }, []);

    const removeFile = useCallback((id: string) => {
        setUploads((prev) => prev.filter((upload) => upload.id !== id));
    }, []);

    const updateFile = useCallback((id: string, updates: Partial<IUploadFile>) => {
        setUploads((prev) => prev.map((upload) => (upload.id === id ? { ...upload, ...updates } : upload)));
    }, []);

    return {
        uploads,
        setUploads,
        loadingLines,
        setLoadingLines,
        isAnyUploading,
        addFiles,
        removeFile,
        updateFile
    };
};
