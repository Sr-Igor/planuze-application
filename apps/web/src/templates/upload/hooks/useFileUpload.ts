import { useCallback, useEffect, useRef } from 'react';

import { useVectorize } from '@/api/callers/vectorize';

import { FileUploadService } from '../services/FileUploadService';
import { FileStatus } from '../types/enums';
import { IUploadFile } from '../types/interfaces';

export interface UseFileUploadProps {
    requests: any;
    rootData: any;
    feature: string;
    onStateChange: (state: { loading: boolean }) => void;
    setUploads: React.Dispatch<React.SetStateAction<IUploadFile[]>>;
    setLoadingLines: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface UseFileUploadReturn {
    handleUpload: (upload: IUploadFile, index: number) => void;
    handleRemove: (upload: IUploadFile, index: number) => void;
    handleRename: (file: { id: string; name: string }, index: number) => void;
    handleVectorize: (file: string, index: number) => void;
    handleDestroyVectorize: (file: string, index: number) => void;
    retryUpload: (upload: IUploadFile, index: number) => void;
}

export const useFileUpload = ({
    requests,
    rootData,
    feature,
    onStateChange,
    setUploads,
    setLoadingLines
}: UseFileUploadProps): UseFileUploadReturn => {
    const uploadServiceRef = useRef<FileUploadService | null>(null);
    const { update: vectorize, destroy: destroyVectorize } = useVectorize({});

    // Recriar serviço quando rootData, requests ou feature mudarem
    useEffect(() => {
        uploadServiceRef.current = new FileUploadService(
            requests,
            rootData,
            feature,
            onStateChange,
            vectorize,
            destroyVectorize
        );
    }, [requests, rootData, feature, onStateChange, vectorize, destroyVectorize]);

    const handleUpload = useCallback(
        async (upload: IUploadFile, index: number) => {
            if (!upload.file || !uploadServiceRef.current) return;

            try {
                // Marcar item como UPLOADING, usando localId/id para evitar colisão por índice
                setUploads((prev) =>
                    prev.map((item, i) =>
                        i === index || item.localId === upload.localId
                            ? { ...item, status: FileStatus.UPLOADING }
                            : item
                    )
                );

                const result = await uploadServiceRef.current.upload(upload.file, rootData);

                setUploads((prev) =>
                    prev.map((item, i) =>
                        i === index || item.localId === upload.localId
                            ? {
                                  ...item,
                                  preview: result.file,
                                  status: FileStatus.DONE,
                                  progress: 100,
                                  vector: null,
                                  vector_error: null,
                                  name: result.name,
                                  id: result.id
                              }
                            : item
                    )
                );
            } catch (error: any) {
                setUploads((prev) =>
                    prev.map((item, i) =>
                        i === index || item.localId === upload.localId
                            ? { ...item, status: FileStatus.ERROR, error: error.message }
                            : item
                    )
                );
            }
        },
        [setUploads, rootData]
    );

    const handleRemove = useCallback(
        async (upload: IUploadFile, index: number) => {
            if (!uploadServiceRef.current) return;

            if (!upload.id) {
                // Se não tem ID, apenas remove do estado local
                setUploads((prev) => prev.filter((_, i) => i !== index));
                return;
            }

            try {
                setUploads((prev) => {
                    const c = [...prev];
                    c[index] = { ...c[index], status: FileStatus.REMOVE };
                    return c;
                });

                await uploadServiceRef.current.remove(upload.id);
                setUploads((prev) => prev.filter((_, i) => i !== index));
            } catch (error: any) {
                setUploads((prev) => {
                    const c = [...prev];
                    c[index] = {
                        ...c[index],
                        status: FileStatus.ERROR,
                        error: error.message
                    };
                    return c;
                });
            }
        },
        [setUploads]
    );

    const handleRename = useCallback(
        async (file: { id: string; name: string }, index: number) => {
            if (!uploadServiceRef.current) return;

            try {
                setLoadingLines((prev) => [...prev, file.id]);
                await uploadServiceRef.current.rename(file.id, file.name);

                setUploads((prev) => {
                    const c = [...prev];
                    c[index] = { ...c[index], name: file.name };
                    return c;
                });
            } catch (error: any) {
                console.error('Error while renaming file:', error);
            } finally {
                setLoadingLines((prev) => prev.filter((id) => id !== file.id));
            }
        },
        [setUploads, setLoadingLines]
    );

    const handleVectorize = useCallback(
        async (file: string, index: number) => {
            if (!uploadServiceRef.current) return;

            try {
                await uploadServiceRef.current.vectorize(file, feature);
                setUploads((prev) => {
                    const c = [...prev];
                    c[index] = { ...c[index], vector: null };
                    return c;
                });
            } catch (error: any) {
                console.error('Error while vectorizing file:', error);
            }
        },
        [setUploads, feature]
    );

    const handleDestroyVectorize = useCallback(
        async (file: string, index: number) => {
            if (!uploadServiceRef.current) return;

            try {
                await uploadServiceRef.current.destroyVectorize(file, feature);
                setUploads((prev) => {
                    const c = [...prev];
                    c[index] = { ...c[index], vector: false };
                    return c;
                });
            } catch (error: any) {
                console.error('Error while destroying vectorize:', error);
            }
        },
        [setUploads, feature]
    );

    const retryUpload = useCallback(
        async (upload: IUploadFile, index: number) => {
            if (!upload.file) return;

            // Reset do status de erro
            setUploads((prev) => {
                const c = [...prev];
                c[index] = {
                    ...c[index],
                    status: FileStatus.WAIT,
                    error: undefined
                };
                return c;
            });

            // Tentar upload novamente
            await handleUpload(upload, index);
        },
        [setUploads, handleUpload]
    );

    return {
        handleUpload,
        handleRemove,
        handleRename,
        handleVectorize,
        handleDestroyVectorize,
        retryUpload
    };
};
