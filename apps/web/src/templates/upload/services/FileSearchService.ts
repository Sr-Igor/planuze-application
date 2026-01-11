import { FileStatus } from '../types/enums';
import { IFileSearchService, IUploadFile } from '../types/interfaces';

export class FileSearchService implements IFileSearchService {
    search(files: IUploadFile[], query: string): IUploadFile[] {
        if (!query.trim()) {
            return files;
        }

        const normalizedQuery = query.toLowerCase().trim();
        return files.filter((file) => {
            const normalizedName = file.name.toLowerCase();
            return normalizedName.includes(normalizedQuery);
        });
    }

    filterByStatus(files: IUploadFile[], status: FileStatus): IUploadFile[] {
        return files.filter((file) => file.status === status);
    }

    filterByVectorStatus(files: IUploadFile[], vectorStatus: boolean | null): IUploadFile[] {
        return files.filter((file) => file.vector === vectorStatus);
    }

    sortByName(files: IUploadFile[], ascending: boolean = true): IUploadFile[] {
        return [...files].sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return ascending ? comparison : -comparison;
        });
    }

    sortByDate(files: IUploadFile[], ascending: boolean = true): IUploadFile[] {
        return [...files].sort((a, b) => {
            const dateA = a.file?.lastModified || 0;
            const dateB = b.file?.lastModified || 0;
            return ascending ? dateA - dateB : dateB - dateA;
        });
    }

    // Métodos adicionais para filtros avançados
    filterByMultipleStatuses(files: IUploadFile[], statuses: FileStatus[]): IUploadFile[] {
        return files.filter((file) => statuses.includes(file.status));
    }

    filterByError(files: IUploadFile[]): IUploadFile[] {
        return files.filter((file) => file.status === FileStatus.ERROR || file.status === FileStatus.ERROR_LOADING);
    }

    filterByProcessing(files: IUploadFile[]): IUploadFile[] {
        return files.filter((file) => file.status === FileStatus.WAIT || file.status === FileStatus.UPLOADING);
    }
}
