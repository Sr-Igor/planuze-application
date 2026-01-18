/**
 * Types for Tags component
 */

export interface ITagsOption<T> {
    label: string;
    value: string;
    item: T;
}

export interface ISelectedTag {
    id?: string;
    title: string;
}

export interface ITagsProps<T> {
    value?: ISelectedTag[];
    onChange?: (value: ISelectedTag[]) => void;
    onChangeCallback?: (item: T | null) => void;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    request: (filters: Record<string, any>) => Promise<any>;
    formatter: (items: T[]) => ITagsOption<T>[];
    formatterOptions?: (item: T) => React.ReactNode;
    searchParam?: string;
    queryParams?: Record<string, any>;
    cacheKey: string;
    fallbackValue?: string;
    limit?: number;
    customSelect?: (item?: T, fallbackValue?: string) => React.ReactNode;
    customTrigger?: () => React.ReactNode;
    containerClassName?: string;
}
