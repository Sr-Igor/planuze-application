export interface IOption<T> {
    label: string;
    value: string;
    item: T;
}

export interface ISelected {
    id?: string;
    title: string;
}

export interface ITagsProps<T> {
    value?: ISelected[];
    onChange?: (value: ISelected[]) => void;
    onChangeCallback?: (item: T | null) => void;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    request: (filters: Record<string, any>) => Promise<any>;
    formatter: (items: T[]) => IOption<T>[];
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
