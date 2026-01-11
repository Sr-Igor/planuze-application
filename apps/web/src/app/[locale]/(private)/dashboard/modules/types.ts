export interface IDashboardModule {
    filters: any;
    setFilters: (filters: any) => void;
    resetFilters: () => void;
    handleExport: () => void;
    isLoading: boolean;
    isExporting: boolean;
}
