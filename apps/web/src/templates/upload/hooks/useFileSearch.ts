import { useCallback, useMemo, useRef, useState } from 'react';

import { FileSearchService } from '../services/FileSearchService';
import { FileStatus } from '../types/enums';
import { ISearchConfig, IUploadFile } from '../types/interfaces';

export interface UseFileSearchProps {
    files: IUploadFile[];
    config?: Partial<ISearchConfig>;
}

export interface UseFileSearchReturn {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredFiles: IUploadFile[];
    searchService: FileSearchService;
    clearSearch: () => void;
    filterByStatus: (status: FileStatus) => IUploadFile[];
    filterByVectorStatus: (vectorStatus: boolean | null) => IUploadFile[];
    sortByName: (ascending?: boolean) => IUploadFile[];
    sortByDate: (ascending?: boolean) => IUploadFile[];
}

export const useFileSearch = ({ files, config }: UseFileSearchProps): UseFileSearchReturn => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchServiceRef = useRef<FileSearchService | null>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Inicializar serviço apenas uma vez
    if (!searchServiceRef.current) {
        searchServiceRef.current = new FileSearchService();
    }

    const searchService = searchServiceRef.current;

    // Debounce para busca
    const debouncedSetSearchQuery = useCallback(
        (query: string) => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }

            debounceTimeoutRef.current = setTimeout(() => {
                setSearchQuery(query);
            }, config?.debounceMs || 300);
        },
        [config?.debounceMs]
    );

    const filteredFiles = useMemo(() => {
        return searchService.search(files, searchQuery);
    }, [files, searchQuery, searchService]);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
    }, []);

    const filterByStatus = useCallback(
        (status: FileStatus) => {
            return searchService.filterByStatus(files, status);
        },
        [files, searchService]
    );

    const filterByVectorStatus = useCallback(
        (vectorStatus: boolean | null) => {
            return searchService.filterByVectorStatus(files, vectorStatus);
        },
        [files, searchService]
    );

    const sortByName = useCallback(
        (ascending: boolean = true) => {
            return searchService.sortByName(files, ascending);
        },
        [files, searchService]
    );

    const sortByDate = useCallback(
        (ascending: boolean = true) => {
            return searchService.sortByDate(files, ascending);
        },
        [files, searchService]
    );

    // Cleanup do timeout no unmount
    const cleanup = useCallback(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
    }, []);

    // Cleanup no unmount
    useMemo(() => {
        return () => cleanup();
    }, [cleanup]);

    return {
        searchQuery,
        setSearchQuery: debouncedSetSearchQuery,
        filteredFiles,
        searchService,
        clearSearch,
        filterByStatus,
        filterByVectorStatus,
        sortByName,
        sortByDate
    };
};
