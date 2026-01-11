import { useEffect, useRef } from 'react';

import { FileStatus } from '../types/enums';
import { IUploadFile } from '../types/interfaces';

export interface UseUploadQueueProps {
    uploads: IUploadFile[];
    onUpload: (upload: IUploadFile, index: number) => void;
    maxConcurrent?: number;
}

export const useUploadQueue = ({ uploads, onUpload, maxConcurrent = 1 }: UseUploadQueueProps) => {
    const isProcessingRef = useRef(false);

    useEffect(() => {
        // Evitar processamento se já está processando
        if (isProcessingRef.current) {
            return;
        }

        // Contar uploads em andamento (apenas UPLOADING, não ERROR)
        const uploadingCount = uploads.filter((u) => u.status === FileStatus.UPLOADING).length;

        // Se já está no limite de concorrência, não processar mais
        if (uploadingCount >= maxConcurrent) {
            return;
        }

        // Encontrar próximo arquivo para processar
        // Ignorar arquivos com erro, apenas processar WAIT
        // Não reprocessar arquivos que já tenham id (persistidos)
        const nextIndex = uploads.findIndex((u) => u.status === FileStatus.WAIT && !u.id);

        if (nextIndex !== -1) {
            isProcessingRef.current = true;
            const nextUpload = uploads[nextIndex];

            if (nextUpload) {
                onUpload(nextUpload, nextIndex);
            }

            // Reset do flag após um pequeno delay para permitir que o estado seja atualizado
            setTimeout(() => {
                isProcessingRef.current = false;
            }, 100);
        }
    }, [uploads, onUpload, maxConcurrent]);
};
